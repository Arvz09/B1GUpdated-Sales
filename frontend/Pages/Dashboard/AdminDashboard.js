// Data (normally this would come from a server)
// Agent data
const agents = [
    {
      id: 1,
      name: "Emma Thompson",
      avatar: "ET",
      deals: 42,
      revenue: 4250000
    },
    {
      id: 2,
      name: "James Wilson",
      avatar: "JW",
      deals: 38,
      revenue: 3820000
    },
    {
      id: 3,
      name: "Sophia Miller",
      avatar: "SM",
      deals: 35,
      revenue: 3580000
    },
    {
      id: 4,
      name: "Daniel Lee",
      avatar: "DL",
      deals: 33,
      revenue: 3350000
    },
    {
      id: 5,
      name: "Olivia Davis",
      avatar: "OD",
      deals: 31,
      revenue: 3170000
    },
    {
      id: 6,
      name: "Michael Brown",
      avatar: "MB",
      deals: 29,
      revenue: 2950000
    },
    {
      id: 7,
      name: "Ava Martinez",
      avatar: "AM",
      deals: 28,
      revenue: 2780000
    },
    {
      id: 8,
      name: "Ethan Clark",
      avatar: "EC",
      deals: 26,
      revenue: 2650000
    },
    {
      id: 9,
      name: "Isabella Wright",
      avatar: "IW",
      deals: 25,
      revenue: 2520000
    },
    {
      id: 10,
      name: "Mason Taylor",
      avatar: "MT",
      deals: 24,
      revenue: 2380000
    }
  ];
  
  // Revenue data
  const revenueData = {
    weekly: [
      { name: "Mon", value: 1700000 },
      { name: "Tue", value: 2100000 },
      { name: "Wed", value: 2750000 },
      { name: "Thu", value: 2400000 },
      { name: "Fri", value: 3100000 },
      { name: "Sat", value: 1900000 },
      { name: "Sun", value: 1350000 }
    ],
    monthly: [
      { name: "Jan", value: 12000000 },
      { name: "Feb", value: 16000000 },
      { name: "Mar", value: 19000000 },
      { name: "Apr", value: 21000000 },
      { name: "May", value: 26000000 },
      { name: "Jun", value: 24000000 },
      { name: "Jul", value: 27000000 },
      { name: "Aug", value: 29000000 },
      { name: "Sep", value: 31000000 },
      { name: "Oct", value: 33500000 },
      { name: "Nov", value: 36000000 },
      { name: "Dec", value: 39000000 }
    ],
    yearly: [
      { name: "2018", value: 210000000 },
      { name: "2019", value: 240000000 },
      { name: "2020", value: 195000000 },
      { name: "2021", value: 260000000 },
      { name: "2022", value: 305000000 },
      { name: "2023", value: 365000000 },
      { name: "2024", value: 290000000 }
    ]
  };
  
  // Format currency in Philippine Pesos
  function formatCurrency(value) {
    if (value >= 1000000) {
      return `₱${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `₱${(value / 1000).toFixed(1)}K`;
    }
    return `₱${value}`;
  }
  
  // Render revenue chart
  function renderRevenueChart(timeframe = 'monthly') {
    const data = revenueData[timeframe];
    
    if (!data || data.length === 0) {
      console.error('No revenue data available');
      return;
    }
  
    // Get the container dimensions for responsive chart
    const chartContainer = document.getElementById('revenue-chart');
    
    // Prepare chart options
    const options = {
      series: [{
        name: 'Revenue',
        data: data.map(item => item.value)
      }],
      chart: {
        type: 'bar',
        height: 300,
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: timeframe === 'yearly' ? '40%' : timeframe === 'monthly' ? '60%' : '70%',
          colors: {
            ranges: [{
              from: 0,
              to: Infinity,
              color: '#403E43'
            }]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: data.map(item => item.name),
        labels: {
          style: {
            colors: '#8A898C',
            fontSize: '12px'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          formatter: function(value) {
            return formatCurrency(value);
          },
          style: {
            colors: '#8A898C',
            fontSize: '12px'
          }
        }
      },
      grid: {
        borderColor: '#E1E1E1',
        strokeDashArray: 3,
        yaxis: {
          lines: {
            show: true
          }
        },
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(value) {
            return formatCurrency(value);
          }
        },
        theme: 'light',
        style: {
          fontSize: '12px',
          fontFamily: undefined
        }
      }
    };
  
    // Clear previous chart if any
    chartContainer.innerHTML = '';
    
    // Create and render the chart
    const chart = new ApexCharts(chartContainer, options);
    chart.render();
  }
  
  // Render agents list
  function renderAgentsList(showAll = false) {
    const agentsContainer = document.getElementById('agents-list');
    
    // Calculate max revenue for scaling
    const maxRevenue = Math.max(...agents.map(agent => agent.revenue));
    
    // Clear previous content
    agentsContainer.innerHTML = '';
    
    // Determine how many agents to display
    const displayAgents = showAll ? agents : agents.slice(0, 5);
    
    // Populate agent items
    displayAgents.forEach((agent, index) => {
      const agentElement = document.createElement('div');
      agentElement.className = 'agent-item';
      agentElement.style.animationDelay = `${index * 0.05}s`;
      
      agentElement.innerHTML = `
        <div class="agent-info">
          <div class="agent-avatar">
            ${agent.avatar}
          </div>
          <div class="agent-details">
            <h3>${agent.name}</h3>
            <p>${agent.deals} deals closed</p>
          </div>
        </div>
        <div class="agent-stats">
          <div class="progress-bar">
            <div class="progress-value" style="width: ${(agent.revenue / maxRevenue) * 100}%"></div>
          </div>
          <span class="revenue-amount">${formatCurrency(agent.revenue)}</span>
        </div>
      `;
      
      agentsContainer.appendChild(agentElement);
    });
  }
  
  // Render agents chart (horizontal bar chart)
  function renderAgentsChart() {
    // Prepare the data
    const chartData = [...agents].sort((a, b) => b.revenue - a.revenue);
    
    if (!chartData || chartData.length === 0) {
      console.error('No agents data available');
      return;
    }
  
    // Prepare chart options
    const options = {
      series: [{
        name: 'Revenue',
        data: chartData.map(agent => agent.revenue)
      }],
      chart: {
        type: 'bar',
        height: 350,  // Adjusted height
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
          barHeight: '60%',
          colors: {
            ranges: [{
              from: 0,
              to: Infinity,
              color: '#403E43'
            }]
          }
        }
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          fontSize: '12px',
          colors: ['#FFFFFF']  // Changed to white for better visibility
        },
        formatter: function(value) {
          return formatCurrency(value);
        },
        offsetX: 10
      },
      xaxis: {
        categories: chartData.map(agent => agent.name),
        labels: {
          style: {
            colors: '#8A898C',
            fontSize: '12px'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#8A898C',
            fontSize: '12px'
          }
        }
      },
      grid: {
        borderColor: '#E1E1E1',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(value) {
            return formatCurrency(value);
          }
        },
        theme: 'light',
        style: {
          fontSize: '12px',
          fontFamily: undefined
        }
      },
      colors: ['#403E43']
    };
  
    // Get chart container and ensure it's visible
    const chartContainer = document.getElementById('agents-chart');
    chartContainer.style.display = 'block';
    chartContainer.innerHTML = '';
    
    // Add a small delay to ensure the container is visible before rendering
    setTimeout(() => {
      // Create and render the chart
      const chart = new ApexCharts(chartContainer, options);
      chart.render();
    }, 50);
  }
  
  // Initialize the dashboard
  function initDashboard() {
    // Render initial components
    renderRevenueChart('monthly');
    renderAgentsList(false);
    
    // Initially prepare agents chart container
    const agentsChartContainer = document.getElementById('agents-chart');
    // Set a fixed height on the container to ensure it has dimensions even when hidden
    agentsChartContainer.style.height = '400px';
    
    // Set up event listeners for the timeframe tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Render chart for the selected timeframe
        const timeframe = this.dataset.timeframe;
        renderRevenueChart(timeframe);
      });
    });
    
    // Set up event listeners for the agents view toggle
    const viewAllButton = document.getElementById('view-all-button');
    const closeAllButton = document.getElementById('close-all-button');
    const agentsList = document.getElementById('agents-list');
    const agentsChart = document.getElementById('agents-chart');
    
    viewAllButton.addEventListener('click', function() {
      // Hide the list first
      agentsList.style.display = 'none';
      // Show the chart container and then render
      agentsChart.style.display = 'block';
      // Force a reflow to ensure the display change takes effect
      void agentsChart.offsetWidth;
      // Now render the chart
      renderAgentsChart();
      // Toggle buttons
      viewAllButton.style.display = 'none';
      closeAllButton.style.display = 'flex';
    });
    
    closeAllButton.addEventListener('click', function() {
      // Hide chart and show list
      agentsChart.style.display = 'none';
      agentsList.style.display = 'flex';
      // Re-render the agents list
      renderAgentsList(false);
      // Toggle buttons
      closeAllButton.style.display = 'none';
      viewAllButton.style.display = 'flex';
    });
  }
  
  // Start the application when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', initDashboard);