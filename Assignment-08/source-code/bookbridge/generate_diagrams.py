import os
try:
    from graphviz import Digraph
except ImportError:
    print("Graphviz python library is not installed.")
    print("Please run: pip install graphviz")
    print("NOTE: You MUST also install the Graphviz Windows software from https://graphviz.org/download/")
    print("and add it to your system PATH.")
    exit(1)

# Create an output directory for the generated images
output_dir = r"D:\shared ftp\Harshal\Sem 6\FS\miniproject\bookbridge\report_images"
os.makedirs(output_dir, exist_ok=True)

print(f"Generating diagram images into: {output_dir}")

# ==========================================
# Figure 1: System Architecture of BookBridge
# ==========================================
print("Generating: System Architecture...")
arch = Digraph('Architecture', filename=f'{output_dir}/Figure_1_Architecture', format='png')
arch.attr(rankdir='LR', dpi='300')

with arch.subgraph(name='cluster_frontend') as c:
    c.attr(label='React.js Frontend\n(Client)', style='filled', color='lightgrey')
    c.node('UI', 'React UI Components\n(Home, Detail, Form)', shape='box', style='filled', fillcolor='white')
    c.node('Axios', 'API Interceptor\n(Axios)', shape='box', style='filled', fillcolor='white')
    c.node('Context', 'Auth Context\n(State & LocalStorage)', shape='box', style='filled', fillcolor='white')
    c.edge('UI', 'Axios')
    c.edge('Context', 'UI')

with arch.subgraph(name='cluster_backend') as c:
    c.attr(label='Node.js & Express\n(Server)', style='filled', color='lightblue')
    c.node('API', 'Express Routes\n(/api/auth, /api/books)', shape='box', style='filled', fillcolor='white')
    c.node('Mid', 'Middleware\n(Multer, JWT Auth)', shape='box', style='filled', fillcolor='white')
    c.node('Models', 'Mongoose Models\n(User, Book)', shape='box', style='filled', fillcolor='white')
    c.edge('API', 'Mid')
    c.edge('Mid', 'Models')

with arch.subgraph(name='cluster_db') as c:
    c.attr(label='MongoDB\n(Database)', style='filled', color='lightgreen')
    c.node('DB', 'NoSQL Database', shape='cylinder', style='filled', fillcolor='white')

arch.edge('Axios', 'API', label=' REST API (HTTP/JSON)', color='blue')
arch.edge('Models', 'DB', label=' Mongoose Queries', color='blue')

arch.render(cleanup=True)


# ==========================================
# Figure 2: User Registration & Login Flow
# ==========================================
print("Generating: Register/Login Flow...")
auth_flow = Digraph('AuthFlow', filename=f'{output_dir}/Figure_2_Auth_Flow', format='png')
auth_flow.attr(rankdir='TB', dpi='300')

auth_flow.node('Start', 'User visits App', shape='oval')
auth_flow.node('Choice', 'Has Account?', shape='diamond', style='filled', fillcolor='lightyellow')
auth_flow.node('Reg', 'Register (Name, Email, Pass)', shape='box')
auth_flow.node('Hash', 'Backend hashes password\n(bcrypt)', shape='box')
auth_flow.node('Save', 'Save to MongoDB', shape='box')
auth_flow.node('Login', 'Login (Email, Pass)', shape='box')
auth_flow.node('Compare', 'Compare Hash (bcrypt)', shape='box')
auth_flow.node('GenJWT', 'Generate JWT (7 Days)', shape='box')
auth_flow.node('Store', 'Store JWT in LocalStorage', shape='box')
auth_flow.node('End', 'Logged In (Access Protected Routes)', shape='oval', style='filled', fillcolor='lightgreen')

auth_flow.edge('Start', 'Choice')
auth_flow.edge('Choice', 'Reg', label=' No')
auth_flow.edge('Reg', 'Hash')
auth_flow.edge('Hash', 'Save')
auth_flow.edge('Save', 'GenJWT')

auth_flow.edge('Choice', 'Login', label=' Yes')
auth_flow.edge('Login', 'Compare')
auth_flow.edge('Compare', 'GenJWT')

auth_flow.edge('GenJWT', 'Store')
auth_flow.edge('Store', 'End')

auth_flow.render(cleanup=True)


# ==========================================
# Figure 3: Book Listing & Browse Flow
# ==========================================
print("Generating: Book Listing Flow...")
book_flow = Digraph('BookFlow', filename=f'{output_dir}/Figure_3_Book_Flow', format='png')
book_flow.attr(rankdir='TB', dpi='300')

book_flow.node('Sell', 'Click "Sell a Book"', shape='oval')
book_flow.node('AuthCheck', 'Authenticated?', shape='diamond', style='filled', fillcolor='lightyellow')
book_flow.node('Form', 'Fill Details & Upload Image', shape='box')
book_flow.node('Multer', 'Multer verifies 2MB limit\n& JPG/PNG type', shape='box')
book_flow.node('SaveBook', 'Save Book Listing \nwith Seller ID', shape='box')
book_flow.node('Browse', 'Home Page (Browse Books)', shape='oval')
book_flow.node('Fetch', 'Frontend requests books\n(Page, Search, Filter)', shape='box')
book_flow.node('Query', 'MongoDB finds matching\navailable books', shape='box')
book_flow.node('Display', 'Render responsive Grid', shape='box', style='filled', fillcolor='lightgreen')

book_flow.edge('Sell', 'AuthCheck')
book_flow.edge('AuthCheck', 'Login', label=' No')
book_flow.edge('AuthCheck', 'Form', label=' Yes')
book_flow.edge('Form', 'Multer')
book_flow.edge('Multer', 'SaveBook')

book_flow.edge('Browse', 'Fetch')
book_flow.edge('Fetch', 'Query')
book_flow.edge('Query', 'Display')
book_flow.edge('SaveBook', 'Query', label='New data updates feed', style='dashed')

book_flow.render(cleanup=True)


# ==========================================
# Figure 4: Book Detail & Contact Flow
# ==========================================
print("Generating: Detail & Contact Flow...")
det_flow = Digraph('DetFlow', filename=f'{output_dir}/Figure_4_Detail_Flow', format='png')
det_flow.attr(rankdir='TB', dpi='300')

det_flow.node('Click', 'User clicks on Book Card', shape='oval')
det_flow.node('Load', 'Fetch single book details\n(/api/books/:id)', shape='box')
det_flow.node('IsUser', 'Is User logged in?\n(JWT present)', shape='diamond', style='filled', fillcolor='lightyellow')
det_flow.node('Hide', 'Hide seller contact\nShow "Login Button"', shape='box', style='filled', fillcolor='lightcoral')
det_flow.node('Show', 'Display Seller Name\n& Contact (WhatsApp/Email)', shape='box', style='filled', fillcolor='lightgreen')
det_flow.node('Deal', 'User contacts seller directly', shape='oval')

det_flow.edge('Click', 'Load')
det_flow.edge('Load', 'IsUser')
det_flow.edge('IsUser', 'Hide', label=' No')
det_flow.edge('IsUser', 'Show', label=' Yes')
det_flow.edge('Show', 'Deal')

det_flow.render(cleanup=True)

print("\nSUCCESS! Flowchart and Architecture images generated in:")
print(f"-> {output_dir}")
print("For the GUI GUI Screenshots, please capture them manually in the browser and add them to the report.")
