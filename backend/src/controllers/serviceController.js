export const getAllServices = (req, res) => {
    const data = [
      {
        category: 'Web Dev',
        services: ['Websites', 'E-commerce', 'Web Apps', 'Hosting', 'SEO'],
        addons: ['Domain setup', 'Extra SEO Package']
      },
      {
        category: 'Production',
        services: ['Video', 'Photo', 'Aerial'],
        addons: ['Drone footage', 'Editing']
      },
      {
        category: 'Branding',
        services: ['Identity & Discovery', 'Graphic Design', 'Print & Merch', 'Brand Booklets'],
        addons: ['Logo pack', 'Brand color guide']
      },
      {
        category: 'Advertising',
        services: ['Social Media', 'Search Engine', 'Paid Advertising'],
        addons: ['Campaign optimization', 'Ad visuals']
      },
      {
        category: 'Strategy',
        services: ['Content', 'Brand', 'Marketing', 'Artificial Intelligence'],
        addons: ['AI strategy session', 'Custom content calendar']
      }
    ];
  
    res.json({ success: true, data });
  };
  

export const createService = (req, res) => {
    const { category, services, addons } = req.body;

    // if service is created in correct format
    if (!category || !Array.isArray(services))
    {
        return res.status(400).json({
            success: false,
            message: 'Invalid service format'
        })
    }

    // here we can add the service to the database
    console.log(`New service added: ${category, services, addons}`);

    // sending response after successfull service creation
    res.status(201).json({
        success: true,
        message: 'service created',
        data: {category, services, addons}
    })
}