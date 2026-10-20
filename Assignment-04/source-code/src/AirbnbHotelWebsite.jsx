import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Star, Heart, Users, Calendar, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import * as d3 from 'd3';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

// Register FusionCharts
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

export default function AirbnbHotelWebsite() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const d3ChartRef = useRef(null);

  const filters = [
    { id: 'all', label: 'All Stays' },
    { id: 'beachfront', label: 'Beachfront' },
    { id: 'city', label: 'City Views' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'unique', label: 'Unique Stays' },
    { id: 'countryside', label: 'Countryside' }
  ];

  const properties = [
    {
      id: 1,
      title: 'Oceanfront Villa with Infinity Pool',
      location: 'Santorini, Greece',
      price: 450,
      rating: 4.95,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
      type: 'beachfront',
      guests: 8,
      beds: 4,
      bookings: 45
    },
    {
      id: 2,
      title: 'Modern Loft in Downtown',
      location: 'New York, USA',
      price: 280,
      rating: 4.88,
      reviews: 94,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      type: 'city',
      guests: 4,
      beds: 2,
      bookings: 78
    },
    {
      id: 3,
      title: 'Luxury Penthouse Suite',
      location: 'Dubai, UAE',
      price: 890,
      rating: 5.0,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop',
      type: 'luxury',
      guests: 6,
      beds: 3,
      bookings: 92
    },
    {
      id: 4,
      title: 'Treehouse Retreat',
      location: 'Bali, Indonesia',
      price: 195,
      rating: 4.92,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
      type: 'unique',
      guests: 2,
      beds: 1,
      bookings: 67
    },
    {
      id: 5,
      title: 'Tuscan Farmhouse Estate',
      location: 'Florence, Italy',
      price: 520,
      rating: 4.97,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=600&fit=crop',
      type: 'countryside',
      guests: 10,
      beds: 5,
      bookings: 54
    },
    {
      id: 6,
      title: 'Minimalist Beach House',
      location: 'Malibu, USA',
      price: 650,
      rating: 4.90,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop',
      type: 'beachfront',
      guests: 6,
      beds: 3,
      bookings: 83
    },
    {
      id: 7,
      title: 'Glass Cabin in the Woods',
      location: 'Aspen, USA',
      price: 380,
      rating: 4.85,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop',
      type: 'unique',
      guests: 4,
      beds: 2,
      bookings: 61
    },
    {
      id: 8,
      title: 'Skyline Apartment',
      location: 'Tokyo, Japan',
      price: 320,
      rating: 4.93,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      type: 'city',
      guests: 3,
      beds: 1,
      bookings: 95
    }
  ];

  // D3.js Chart - Property Ratings Distribution
  useEffect(() => {
    if (d3ChartRef.current && showAnalytics) {
      // Clear previous chart
      d3.select(d3ChartRef.current).selectAll('*').remove();

      const margin = { top: 20, right: 30, bottom: 40, left: 50 };
      const width = 500 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const svg = d3.select(d3ChartRef.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Data for ratings distribution
      const ratingsData = [
        { rating: '4.8-4.9', count: 3 },
        { rating: '4.9-5.0', count: 5 }
      ];

      // X scale
      const x = d3.scaleBand()
        .range([0, width])
        .domain(ratingsData.map(d => d.rating))
        .padding(0.3);

      // Y scale
      const y = d3.scaleLinear()
        .domain([0, d3.max(ratingsData, d => d.count)])
        .range([height, 0]);

      // Bars with animation
      svg.selectAll('rect')
        .data(ratingsData)
        .enter()
        .append('rect')
        .attr('x', d => x(d.rating))
        .attr('width', x.bandwidth())
        .attr('y', height)
        .attr('height', 0)
        .attr('fill', '#2c3e50')
        .attr('rx', 4)
        .transition()
        .duration(800)
        .attr('y', d => y(d.count))
        .attr('height', d => height - y(d.count));

      // X axis
      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .style('font-family', 'Inter, sans-serif')
        .style('font-size', '12px');

      // Y axis
      svg.append('g')
        .call(d3.axisLeft(y).ticks(5))
        .style('font-family', 'Inter, sans-serif')
        .style('font-size', '12px');

      // Title
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Playfair Display, serif')
        .style('font-size', '16px')
        .style('font-weight', '600')
        .text('Ratings Distribution');
    }
  }, [showAnalytics]);

  // Chart.js - Booking Trends (Line Chart)
  const bookingTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bookings',
        data: [45, 59, 80, 81, 96, 115],
        borderColor: '#2c3e50',
        backgroundColor: 'rgba(44, 62, 80, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Monthly Booking Trends',
        font: {
          family: 'Playfair Display, serif',
          size: 16,
          weight: '600'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: 'Inter, sans-serif'
          }
        }
      },
      x: {
        ticks: {
          font: {
            family: 'Inter, sans-serif'
          }
        }
      }
    }
  };

  // Chart.js - Property Types Distribution (Doughnut)
  const propertyTypesData = {
    labels: ['Beachfront', 'City', 'Luxury', 'Unique', 'Countryside'],
    datasets: [
      {
        data: [
          properties.filter(p => p.type === 'beachfront').length,
          properties.filter(p => p.type === 'city').length,
          properties.filter(p => p.type === 'luxury').length,
          properties.filter(p => p.type === 'unique').length,
          properties.filter(p => p.type === 'countryside').length
        ],
        backgroundColor: [
          '#3498db',
          '#2c3e50',
          '#f39c12',
          '#27ae60',
          '#8e44ad'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  // FusionCharts - Revenue by Property (Column Chart)
  const fusionChartConfig = {
    type: 'column2d',
    width: '100%',
    height: '300',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Revenue by Property (Last Month)',
        subCaption: 'In USD',
        xAxisName: 'Property',
        yAxisName: 'Revenue',
        theme: 'fusion',
        baseFont: 'Inter',
        baseFontSize: '12',
        captionFont: 'Playfair Display',
        captionFontSize: '16',
        captionFontBold: '1',
        paletteColors: '#2c3e50,#34495e,#3498db,#2980b9,#1abc9c,#16a085,#27ae60,#2ecc71',
        showValues: '1',
        placeValuesInside: '0',
        rotateValues: '0',
        valueFontColor: '#666',
        numberPrefix: '$',
        numberSuffix: 'K'
      },
      data: properties.slice(0, 8).map(property => ({
        label: property.location.split(',')[0],
        value: (property.price * property.bookings / 1000).toFixed(1)
      }))
    }
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredProperties = properties.filter(property => {
    const matchesFilter = activeFilter === 'all' || property.type === activeFilter;
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #faf9f6 0%, #f5f3ef 50%, #faf9f6 100%)',
      fontFamily: '"Playfair Display", serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .property-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: scaleIn 0.5s ease-out backwards;
        }

        .property-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .property-card:nth-child(1) { animation-delay: 0.1s; }
        .property-card:nth-child(2) { animation-delay: 0.2s; }
        .property-card:nth-child(3) { animation-delay: 0.3s; }
        .property-card:nth-child(4) { animation-delay: 0.4s; }
        .property-card:nth-child(5) { animation-delay: 0.5s; }
        .property-card:nth-child(6) { animation-delay: 0.6s; }
        .property-card:nth-child(7) { animation-delay: 0.7s; }
        .property-card:nth-child(8) { animation-delay: 0.8s; }

        .filter-btn {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .filter-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .filter-btn:hover::before {
          left: 100%;
        }

        .hero-section {
          animation: fadeIn 1s ease-out;
        }

        .search-container {
          animation: fadeInUp 0.8s ease-out 0.3s backwards;
        }

        .image-container {
          overflow: hidden;
          position: relative;
        }

        .image-container img {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .property-card:hover .image-container img {
          transform: scale(1.08);
        }

        .heart-btn {
          transition: all 0.3s ease;
        }

        .heart-btn:hover {
          transform: scale(1.15);
        }

        .heart-btn:active {
          transform: scale(0.95);
        }

        .grain-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E");
          z-index: 1;
        }

        .analytics-section {
          animation: fadeInUp 0.6s ease-out;
        }

        .chart-container {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
      `}</style>

      <div className="grain-overlay"></div>

      {/* Header */}
      <header style={{
        padding: '24px 48px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #2c3e50 0%, #000000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: '"Playfair Display", serif'
          }}>
            LuxeStay
          </div>
          <nav style={{
            display: 'flex',
            gap: '32px',
            fontFamily: '"Inter", sans-serif',
            fontSize: '15px',
            fontWeight: '500',
            alignItems: 'center'
          }}>
            <a href="#" style={{ color: '#2c3e50', textDecoration: 'none', transition: 'color 0.3s' }}>Stays</a>
            <a href="#" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.3s' }}>Experiences</a>
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              style={{
                background: showAnalytics ? '#2c3e50' : 'transparent',
                color: showAnalytics ? 'white' : '#666',
                border: '2px solid #2c3e50',
                padding: '8px 20px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s'
              }}
            >
              <BarChart3 size={16} />
              Analytics
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" style={{
        padding: '80px 48px 60px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: 'clamp(48px, 6vw, 72px)',
          fontWeight: '700',
          letterSpacing: '-0.03em',
          color: '#1a1a1a',
          marginBottom: '16px',
          lineHeight: '1.1'
        }}>
          Find your perfect escape
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#666',
          fontFamily: '"Inter", sans-serif',
          fontWeight: '300',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          Discover extraordinary places to stay around the world with data-driven insights
        </p>
      </section>

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <div className="analytics-section" style={{
          maxWidth: '1400px',
          margin: '0 auto 60px',
          padding: '0 48px'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '600',
            marginBottom: '32px',
            color: '#1a1a1a'
          }}>
            Platform Analytics
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '32px',
            marginBottom: '40px'
          }}>
            {/* D3.js Chart */}
            <div className="chart-container">
              <div ref={d3ChartRef}></div>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '13px',
                color: '#666',
                marginTop: '12px',
                textAlign: 'center'
              }}>
                D3.js Visualization
              </p>
            </div>

            {/* Chart.js Line Chart */}
            <div className="chart-container">
              <div style={{ height: '300px' }}>
                <Line data={bookingTrendsData} options={chartOptions} />
              </div>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '13px',
                color: '#666',
                marginTop: '12px',
                textAlign: 'center'
              }}>
                Chart.js Line Chart
              </p>
            </div>

            {/* Chart.js Doughnut Chart */}
            <div className="chart-container">
              <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '80%', maxWidth: '300px' }}>
                  <Doughnut
                    data={propertyTypesData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            font: {
                              family: 'Inter, sans-serif',
                              size: 11
                            },
                            padding: 12
                          }
                        },
                        title: {
                          display: true,
                          text: 'Property Types Distribution',
                          font: {
                            family: 'Playfair Display, serif',
                            size: 16,
                            weight: '600'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '13px',
                color: '#666',
                marginTop: '12px',
                textAlign: 'center'
              }}>
                Chart.js Doughnut Chart
              </p>
            </div>

            {/* FusionCharts */}
            <div className="chart-container">
              <ReactFC {...fusionChartConfig} />
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '13px',
                color: '#666',
                marginTop: '12px',
                textAlign: 'center'
              }}>
                FusionCharts Column Chart
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="search-container" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 48px 40px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '60px',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.06)'
        }}>
          <Search size={20} color="#666" style={{ marginLeft: '16px' }} />
          <input
            type="text"
            placeholder="Search destinations or properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              fontFamily: '"Inter", sans-serif',
              padding: '12px 8px',
              background: 'transparent'
            }}
          />
          <button style={{
            background: 'linear-gradient(135deg, #2c3e50 0%, #1a1a1a 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            padding: '14px 36px',
            fontSize: '15px',
            fontFamily: '"Inter", sans-serif',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}>
            Search
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 48px 48px',
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        scrollbarWidth: 'none'
      }}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className="filter-btn"
            style={{
              padding: '12px 28px',
              border: activeFilter === filter.id ? '2px solid #2c3e50' : '2px solid rgba(0, 0, 0, 0.1)',
              background: activeFilter === filter.id ? '#2c3e50' : 'white',
              color: activeFilter === filter.id ? 'white' : '#333',
              borderRadius: '30px',
              fontSize: '14px',
              fontFamily: '"Inter", sans-serif',
              fontWeight: '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em'
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Properties Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 48px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '40px'
      }}>
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="property-card"
            style={{
              background: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
              cursor: 'pointer',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="image-container" style={{ position: 'relative', height: '280px' }}>
              <img
                src={property.image}
                alt={property.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(property.id);
                }}
                className="heart-btn"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <Heart
                  size={20}
                  fill={favorites.has(property.id) ? '#ff385c' : 'none'}
                  color={favorites.has(property.id) ? '#ff385c' : '#666'}
                />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  fontFamily: '"Playfair Display", serif',
                  lineHeight: '1.3',
                  flex: 1
                }}>
                  {property.title}
                </h3>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '12px',
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px',
                color: '#666'
              }}>
                <MapPin size={14} />
                <span>{property.location}</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '16px',
                fontFamily: '"Inter", sans-serif',
                fontSize: '13px',
                color: '#888'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={14} />
                  <span>{property.guests} guests</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} />
                  <span>{property.beds} beds</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Star size={16} fill="#ffd700" color="#ffd700" />
                  <span style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1a1a1a'
                  }}>
                    {property.rating}
                  </span>
                  <span style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '13px',
                    color: '#888'
                  }}>
                    ({property.reviews})
                  </span>
                </div>
                <div>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#2c3e50',
                    fontFamily: '"Playfair Display", serif'
                  }}>
                    ${property.price}
                  </span>
                  <span style={{
                    fontSize: '14px',
                    color: '#888',
                    fontFamily: '"Inter", sans-serif',
                    marginLeft: '4px'
                  }}>
                    /night
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        background: '#1a1a1a',
        color: 'white',
        padding: '60px 48px',
        fontFamily: '"Inter", sans-serif'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px'
        }}>
          <div>
            <h4 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '24px',
              marginBottom: '16px',
              fontWeight: '600'
            }}>
              LuxeStay
            </h4>
            <p style={{ fontSize: '14px', color: '#999', lineHeight: '1.6' }}>
              Your gateway to extraordinary stays with powerful analytics
            </p>
          </div>
          <div>
            <h5 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Company</h5>
            <ul style={{ listStyle: 'none', fontSize: '14px', color: '#999' }}>
              <li style={{ marginBottom: '8px' }}>About Us</li>
              <li style={{ marginBottom: '8px' }}>Careers</li>
              <li style={{ marginBottom: '8px' }}>Press</li>
            </ul>
          </div>
          <div>
            <h5 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Support</h5>
            <ul style={{ listStyle: 'none', fontSize: '14px', color: '#999' }}>
              <li style={{ marginBottom: '8px' }}>Help Center</li>
              <li style={{ marginBottom: '8px' }}>Safety</li>
              <li style={{ marginBottom: '8px' }}>Contact</li>
            </ul>
          </div>
          <div>
            <h5 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>Legal</h5>
            <ul style={{ listStyle: 'none', fontSize: '14px', color: '#999' }}>
              <li style={{ marginBottom: '8px' }}>Privacy</li>
              <li style={{ marginBottom: '8px' }}>Terms</li>
              <li style={{ marginBottom: '8px' }}>Cookies</li>
            </ul>
          </div>
        </div>
        <div style={{
          maxWidth: '1400px',
          margin: '40px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          fontSize: '13px',
          color: '#666'
        }}>
          © 2024 LuxeStay. All rights reserved. | Powered by D3.js, Chart.js & FusionCharts
        </div>
      </footer>
    </div>
  );
}
