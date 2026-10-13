// EDIT THIS FILE to update the portfolio.
// Each repeated section is an array: copy an item, change its values, and save.
// Layout, animation, and component code live elsewhere and normally need no edits.

export const siteContent = {
  metadata: {
    title: 'Akshat Ramachandran — Architecting Intelligence',
    description: 'Akshat Ramachandran co-designs algorithms, system kernels, and hardware for efficient foundation-model inference.',
    socialDescription: 'Cross-layer co-design for efficient foundation models through adaptable sparsity and quantization.',
    url: 'https://akshatramachandran.github.io/',
    image: 'https://akshatramachandran.github.io/images/og.png'
  },

  identity: {
    firstName: 'Akshat',
    lastName: 'Ramachandran',
    initials: 'AR',
    location: 'Atlanta, GA',
    status: 'Researching at Georgia Tech',
    email: 'akshat.r@gatech.edu',
    cv: 'data/Akshat_Ramachandran_CV.pdf',
    availability: 'May 2027',
    availabilityLabel: 'Open for full-time roles',
    copyrightYear: '2026',
    links: {
      linkedin: 'https://www.linkedin.com/in/akshat-ramachandran-3981951bb',
      github: 'https://github.com/ARamachandran2000',
      scholar: 'https://scholar.google.com/citations?user=FiNleXIAAAAJ&hl=en&oi=ao'
    }
  },

  navigation: [
    { label: 'Research', href: '#research' },
    { label: 'Experience', href: '#experience' },
    { label: 'Publications', href: '#publications' },
    { label: 'Contact', href: '#contact' }
  ],

  socials: [
    { label: 'LinkedIn', icon: 'linkedin', hrefKey: 'linkedin' },
    { label: 'GitHub', icon: 'github', hrefKey: 'github' },
    { label: 'Email', ariaLabel: 'Email Akshat', icon: 'email', hrefKey: 'email' },
    { label: 'CV', ariaLabel: 'View curriculum vitae', icon: 'document', hrefKey: 'cv' }
  ],

  hero: {
    introduction: 'I design next-generation AI inference infrastructure with efficiency as a first-class objective. Through cross-layer co-design—from model-compression algorithms and runtime systems to specialized hardware—I help AI scale through efficiency, not simply by throwing more compute and memory at the problem.'
  },

  about: {
    headingHtml: 'Making foundation-model inference <em>efficient by design.</em>',
    portrait: 'images/portfolio-portrait.png',
    portraitAlt: 'Portrait of Akshat Ramachandran',
    paragraphsHtml: [
      'I am a Ph.D. candidate in Electrical and Computer Engineering at the <a href="https://synergy.ece.gatech.edu">Synergy Lab</a>, Georgia Tech, advised by <a href="https://tusharkrishna.ece.gatech.edu">Prof. Tushar Krishna</a>. I am in my <strong>fourth and final year</strong>, with expected graduation in <strong>May 2027</strong>. My thesis explores algorithm-hardware co-design for efficient foundation-model computing through adaptable sparsity and quantization.',
      'Across a continuum from static, model-centric compression to dynamic, token-centric and agentic inference, I design adaptive numerics and sparsity techniques that preserve accuracy while improving memory scalability, latency, and energy efficiency. My work spans runtime-adaptive precision, efficient reasoning and diffusion models, and specialized accelerator architectures.'
    ],
    interests: [
      'Computer architecture',
      'Efficient AI',
      'Hardware–software co-design',
      'Foundation models (LMs and VLMs)',
      'Computer vision',
      'Computer arithmetic',
      'Digital circuit design'
    ],
    tools: [
      'Python',
      'C/C++',
      'Verilog',
      'SystemVerilog',
      'HLS (Vivado, Catapult)',
      'CUDA',
      'Triton',
      'PyTorch',
      'Keras',
      'Synopsys Design Compiler',
      'Innovus'
    ],
    education: [
      { degree: 'Ph.D. · Electrical and Computer Engineering', institution: 'Georgia Institute of Technology', dates: '2023–2027 · Expected May 2027', detail: 'GPA 4.0/4.0 · Finance minor, Scheller College of Business' },
      { degree: 'M.S. (Thesis) · Electrical and Computer Engineering', institution: 'Georgia Institute of Technology', dates: '2023–2025', detail: 'GPA 4.0/4.0 · Flexible and temporal N:M sparsity for digital compute-in-memory' },
      { degree: 'B.Tech. · Electronics Engineering', institution: 'VJTI, Mumbai', dates: '2018–2022', detail: 'GPA 9.80/10.0 · Department rank 1/83, Gold Medalist · Institute rank 2/480' }
    ]
  },

  research: {
    headingHtml: 'Three-Scale Co-Optimization.',
    areas: [
      {
        title: 'Adaptive algorithms',
        description: 'Sparsity and quantization techniques that adapt to layers, tokens, prompts, and agentic workloads. Runtime-adaptive precision adjusts weights, activations, and KV caches as inference demands change.',
        keywords: [
          { label: 'Quantization', papers: ['OuroMamba', 'MicroScopiQ', 'CLAMP-ViT', 'Logarithmic Posits'] },
          { label: 'Sparsity', papers: ['FLOW + FlexCiM', 'RECAP'] },
          { label: 'Token adaptation', papers: ['ThinKV', 'Polestar'] }
        ]
      },
      {
        title: 'Runtime systems & kernels',
        description: 'Low-precision attention kernels, precision-aware paged KV-cache management, and LLM serving across heterogeneous GPUs and TPUs. Runtime mechanisms turn compression into practical inference speedups under cost and latency constraints.',
        keywords: [
          { label: 'Efficient kernels', papers: ['ThinKV', 'OuroMamba'] },
          { label: 'KV cache optimization', papers: ['ThinKV', 'Polestar'] },
        ]
      },
      {
        title: 'Hardware architecture',
        description: 'Flexible sparsity and quantization accelerators, datapath optimization for next-generation number formats, compute-in-memory, and on-chip networks that support adaptive algorithms.',
        keywords: [
          { label: 'Accelerators', papers: ['FLOW + FlexCiM', 'MicroScopiQ', 'Logarithmic Posits'] },
          { label: 'Numerics', papers: ['Logarithmic Posits', 'MicroScopiQ'] },
          { label: 'Design space exploration', papers: ['AIrchitect v2', 'OneDSE'] }
        ]
      }
    ],
    projects: [
      { title: 'Unified prefill–decode chip', status: 'In progress · Samsung 14 nm FinFET', description: 'Designing a unified digital compute-in-memory and dot product unit with shared SRAM for LLM prefill–decode disaggregation on a single chip, spanning algorithm design through GDS.' },
      { title: 'Mixed-precision multi-agent systems', status: 'In progress', description: 'Developing a hierarchical multi-agent runtime that uses task dependencies, handoff requirements, and confidence to select sub-LLM precision under resource budgets. The precision policy targets unnecessary and incorrect tool calls caused by quantization in the ReAct loop.' },
      { title: 'GNN & transformer accelerator SoC', status: 'Jan–Nov 2024 · TSMC 28 nm', description: 'Contributed sparse accelerator RTL for a processing element supporting mixed N:M sparsity.' }
    ]
  },

  experience: {
    headingHtml: 'Where I’ve worked<br>and what I’ve built.',
    items: [
      {
        year: '2026', dates: 'Oct 2026–Present', company: 'Infravana', role: 'Founding Engineer Intern · Seed-stage startup', location: 'San Francisco, CA', mark: 'IF',
        summary: 'Building an LLM serving layer across heterogeneous GPUs, TPUs, and other compute infrastructure to improve cost efficiency while meeting latency service-level objectives.',
        keywords: []
      },
      {
        year: '2026', dates: 'May 2026–Present', company: 'NVIDIA Research', role: 'Ph.D. Research Intern · Accelerators & VLSI', location: 'Santa Clara, CA', mark: 'NV',
        summary: 'Developed a runtime-adaptive quantization framework that dynamically adjusts weight, activation, and KV cache precision during long-horizon agentic inference. Designed a composable, multi-scale format built on a shared NVFP4 representation and optimized the Tensor Core datapath with a 2-bit quinary format, achieving 2× baseline NVFP4 prefill throughput.',
        keywords: [{ label: 'Mixed precision', papers: ['OuroMamba', 'MicroScopiQ', 'CLAMP-ViT'] }, { label: 'Algorithm–hardware co-design', papers: ['FLOW + FlexCiM', 'Logarithmic Posits'] }]
      },
      {
        year: '2025', dates: 'May–Aug 2025', company: 'NVIDIA Research', role: 'Ph.D. Research Intern · Accelerators & VLSI', location: 'Santa Clara, CA', mark: 'NV',
        summary: 'Proposed ThinKV, a thought-adaptive KV-cache compression technique combining selective quantization and token eviction. Reduced KV-cache memory usage by more than 96% with near-lossless accuracy, filed a provisional patent, and led work selected for an ICLR 2026 oral presentation.',
        keywords: [{ label: 'KV-cache compression', papers: ['ThinKV'] }]
      },
      {
        year: '2024', dates: 'Aug–Dec 2024', company: 'Intel Labs', role: 'AI Hardware Research Intern', location: 'Santa Clara, CA', mark: 'IN',
        summary: 'Proposed outlier-density-aware N:M sparsity selection and FlexCiM, a digital compute-in-memory architecture supporting flexible structured sparsity. Integrated FlexCiM into Intel NPU-v7, resulting in an ISLPED 2025 Best Paper Award and a patent filing.',
        keywords: [{ label: 'Flexible N:M sparsity', papers: ['FLOW + FlexCiM'] }, { label: 'Compute-in-memory', papers: ['FLOW + FlexCiM'] }]
      },
      {
        year: '2024', dates: 'May–Aug 2024', company: 'NVIDIA Corporation', role: 'Architecture Energy Modeling Intern', location: 'Santa Clara, CA', mark: 'NV',
        summary: 'Developed an AI-based GPU power estimation tool. Used transfer learning from parent chips to derivative architectures to reduce data collection and training effort by 5×.',
        keywords: [{ label: 'Architecture modeling', papers: ['AIrchitect v2', 'OneDSE'] }]
      },
      {
        year: '2023', dates: 'Aug 2023–Present', company: 'Georgia Institute of Technology', role: 'Graduate Research Assistant · Synergy Lab', location: 'Atlanta, GA', mark: 'GT',
        summary: 'Conducting doctoral research with Prof. Tushar Krishna on co-designing hardware and algorithms for efficient foundation-model computing through adaptable sparsity and quantization.',
        keywords: [{ label: 'Quantization & sparsity', papers: ['MicroScopiQ', 'FLOW + FlexCiM', 'ThinKV'] }]
      },
      {
        year: '2023', dates: 'Jun–Aug 2023', company: 'Lemurian Labs', role: 'Hardware Intern', location: 'Menlo Park, CA', mark: 'LL',
        summary: 'Designed and verified a smart on-chip network using SystemVerilog and Python/PyUVM, achieving 35% higher operating frequency and 2.5× better performance. Deployed an adaptive logarithmic datatype in Python and C++ and evaluated mixed-precision BERT and GPT, yielding a 10× speedup over floats.',
        keywords: [{ label: 'On-chip networks', papers: ['MicroScopiQ'] }, {label: 'Adaptive arithmetic', papers: ['Logarithmic Posits'] }]
      },
      {
        year: '2022', dates: 'Aug 2022–Jul 2023', company: 'Samsung Research & Development', role: 'Visual Intelligence Engineer', location: 'Suwon, South Korea', mark: 'SS',
        summary: 'Co-designed depth perception algorithms and accelerators for XR devices, leading to an ICIP publication, a patent, and a Samsung Best Paper Award nomination. Reduced on-device depth-fusion inference latency by 67% and ToF acquisition latency by 60%.',
        keywords: []
      },
      {
        year: '2021', dates: 'Jul 2021–Dec 2022', company: 'IIT Bombay', role: 'Research Assistant', location: 'Mumbai, India', mark: 'IB',
        summary: 'Designed and verified a reconfigurable, programmable, multithreaded 40 Gb/s NIC and MAC architecture in HLS and Verilog for the Ajit processor. Implemented packet generation, forwarding verification, and NIC support libraries in C.',
        keywords: []
      },
      {
        year: '2021', dates: 'May–Jul 2021', company: 'Samsung Research & Development', role: 'Summer Research Intern', location: 'Bangalore, India & Suwon, South Korea', mark: 'SS',
        summary: 'Researched memory-efficient deep-learning algorithms and architectures for AR. Remodeled a 3D reconstruction pipeline in Python and C and designed a memory controller with parameter clustering, achieving nearly 2× higher performance.',
        keywords: []
      }
    ]
  },

  publications: {
    headingHtml: 'Research across<br>the stack.',
    scholarHrefKey: 'scholar',
    items: [
      {
        title: 'ThinKV', year: 2026, venue: 'ICLR · 2026', category: 'Oral · Top 1.13%',
        subtitle: 'Thought-Adaptive KV Cache Compression for Efficient Reasoning Models',
        description: 'ThinKV reads attention sparsity as a signal of which reasoning tokens matter, then combines adaptive quantization with selective eviction. A PagedAttention-compatible kernel reuses freed cache slots, preserving near-lossless accuracy with under 5% of the KV cache.',
        url: 'https://arxiv.org/abs/2510.01290', image: 'images/publications/thinKV-paper-figure.png', imageClass: 'publication-image--thin-kv',
        imageAlt: 'ThinKV paper figure showing adaptive reasoning-token compression and accuracy–latency trade-offs', accent: '#81513d'
      },
      {
        title: 'OuroMamba', year: 2025, venue: 'ICCV · 2025', category: 'Data-free quantization',
        subtitle: 'A Data-Free Quantization Framework for Vision Mamba',
        description: 'OuroMamba synthesizes calibration examples from patch-level relationships in Vision Mamba’s latent states, then quantizes with mixed precision and time-varying outlier detection. It brings data-free quantization to Vision Mamba while delivering practical GPU-kernel speedups.',
        url: 'https://arxiv.org/abs/2503.10959', image: 'images/publications/ouromamba-paper-figure.png',
        imageAlt: 'OuroMamba dynamic outlier quantization diagram', accent: '#89937b'
      },
      {
        title: 'FLOW + FlexCiM', year: 2025, venue: 'ISLPED · 2025', category: 'Best Paper Award',
        subtitle: 'Accelerating LLM Inference with Flexible N:M Sparsity via a Fully Digital Compute-in-Memory Accelerator',
        description: 'FLOW chooses an outlier-aware N:M sparsity pattern independently for each layer; FlexCiM maps those patterns to hardware by regrouping small digital compute-in-memory sub-macros. Together, the algorithm and architecture improve sparse-model accuracy while reducing inference latency and energy.',
        url: 'https://arxiv.org/abs/2504.14365', image: 'images/publications/flexcim.png', imageClass: 'publication-image--flexcim',
        imageAlt: 'FLOW sparsity patterns and FlexCiM accelerator diagram', accent: '#a68a52'
      },
      {
        title: 'MicroScopiQ', year: 2025, venue: 'ISCA · 2025', category: 'Acceptance rate 23%',
        subtitle: 'Accelerating Foundational Models through Outlier-Aware Microscaling Quantization',
        description: 'MicroScopiQ keeps rare, high-magnitude features at higher precision and prunes less important weights to make the resulting representation hardware-friendly. Simple mixed-precision integer units and its ReCoN on-chip network support the irregular outliers without assuming they are clustered.',
        url: 'https://arxiv.org/abs/2411.05282', image: 'images/publications/microscopiq-card.png', imageClass: 'publication-image--microscopiq',
        imageAlt: 'MicroScopiQ outlier-aware microscaling diagram', accent: '#89937b'
      },
      {
        title: 'AIrchitect v2', year: 2025, venue: 'DATE · 2025', category: 'Equal contribution',
        subtitle: 'Learning the Hardware Accelerator Design Space through Unified Representations',
        description: 'AIrchitect v2 embeds accelerator designs in a shared representation, then uses a transformer and unified ordinal outputs to combine classification with regression. This makes a huge, irregular design space easier to search and improves the chance of finding strong configurations for unseen workloads.',
        url: 'https://arxiv.org/abs/2501.09954', image: 'images/publications/airchitect-v2.png',
        imageAlt: 'AIrchitect v2 learned design-space exploration diagram', accent: '#aa7e69'
      },
      {
        title: 'CLAMP-ViT', year: 2024, venue: 'ECCV · 2024', category: 'Vision transformers',
        subtitle: 'Contrastive Data-Free Learning for Adaptive Post-Training Quantization of ViTs',
        description: 'CLAMP-ViT creates calibration data without access to training images by contrastively aligning patch-level features, then alternates data synthesis with quantization. A layer-wise evolutionary search selects fixed- or mixed-precision settings that retain vision accuracy at a given compression target.',
        url: 'https://arxiv.org/abs/2407.05266', image: 'images/publications/clamp-vit.png',
        imageAlt: 'CLAMP-ViT data-free quantization pipeline diagram', accent: '#667d86'
      },
      {
        title: 'Logarithmic Posits', year: 2024, venue: 'DAC · 2024', category: 'Acceptance rate 19%',
        subtitle: 'Algorithm-Hardware Co-Design of Distribution-Aware Logarithmic-Posit Encodings for Efficient DNN Inference',
        description: 'Logarithmic Posits adapt their bit fields to each layer’s weight and activation distributions. A global–local contrastive objective guides layer-wise format search, while a matching mixed-precision accelerator turns the custom encoding into gains in area efficiency and energy.',
        url: 'https://arxiv.org/abs/2403.05465', image: 'images/publications/logarithmic-posits.png',
        imageAlt: 'Logarithmic posit format and accelerator diagram', accent: '#9a8d6d'
      },
      {
        title: 'Polestar', year: 2026, venue: 'NeurIPS · 2026', category: 'Equal contribution · ICLR Workshop 2026', metaLayout: 'stacked',
        subtitle: 'Polestar: Drift-Aware Cache Calibration and Token Commitment for Efficient Inference of Diffusion LLMs',
        description: 'Polestar uses token-representation drift as one signal for two inference decisions: selectively refresh stale KV-cache positions and commit tokens ready to stop changing. The joint cache-and-decoding policy improves the accuracy–throughput trade-off in diffusion LLMs.',
        url: 'https://openreview.net/forum?id=e3ITaLZ4ct', image: 'images/publications/polestar-paper-figure.png',
        imageAlt: 'Polestar figure showing accuracy versus tokens per second for diffusion language model inference', accent: '#81513d'
      },
      {
        title: 'RECAP', year: 2025, venue: 'ISCA Workshop · 2025', category: 'Oral presentation',
        subtitle: 'Training-Free Compensation for Coarse Activation Channel Pruning in Compressed LLMs',
        description: 'RECAP estimates the activation error introduced by removing a channel and transfers that signal to its corresponding weights—without retraining the model. Grouped statistics make the correction more robust to activation outliers, recovering accuracy while retaining hardware-friendly channel sparsity.',
        url: 'https://openreview.net/forum?id=lwFmqNJbny', image: 'images/publications/recap.png',
        imageAlt: 'RECAP activation channel pruning compensation diagram', accent: '#a68a52'
      },
      {
        title: 'OneDSE', year: 2025, venue: 'Preprint · 2025', category: 'CPU design space',
        subtitle: 'A Unified Microprocessor Metric Prediction and Design Space Exploration Framework',
        description: 'OneDSE couples a workload-aware transformer predictor with a metric-space search strategy and a multi-agent reinforcement-learning explorer. The combination predicts CPU performance for unfamiliar workloads and explores parameter settings faster and more accurately than treating prediction and search as separate tasks.',
        url: 'https://arxiv.org/abs/2505.03771', image: 'images/publications/onedse.png',
        imageAlt: 'OneDSE multi-agent CPU design-space exploration diagram', accent: '#667d86'
      }
    ]
  },

  news: {
    headingHtml: 'News &<br>recognition.',
    featured: {
      date: 'April 2026', type: 'Recognition', title: 'ThinKV at ICLR',
      description: 'Selected for an oral presentation—among the top 1.13% of accepted ICLR 2026 papers.',
      stampHtml: 'ICLR<br>ORAL'
    },
    items: [
      { date: 'Oct 2026', type: 'Career', textHtml: 'Joined <strong>Infravana</strong> as a founding engineer intern, building efficient LLM serving across heterogeneous compute.' },
      { date: '2026', type: 'Paper', textHtml: '<strong>Polestar</strong> accepted at <strong>NeurIPS 2026</strong>, with equal contribution.' },
      { date: 'May 2026', type: 'Career', textHtml: 'Returned to <strong>NVIDIA Research</strong> to develop runtime-adaptive quantization for long-horizon agentic inference.' },
      { date: '2026', type: 'Honor', textHtml: 'Named an <strong>MLCommons Rising Star</strong> in machine learning and systems research.' },
      { date: '2026', type: 'Service', textHtml: 'Served as submission co-chair for <a href="https://microarch.org/micro59/" target="_blank" rel="noopener noreferrer"><strong>MICRO 2026</strong></a>.' },
      { date: 'Mar 2026', type: 'Milestone', textHtml: 'Defended Ph.D. proposal on adaptable sparsity and quantization for efficient foundation-model computing.' },
      { date: 'Mar 2026', type: 'Paper', textHtml: 'Polestar-Cache published at the Latent & Implicit Thinking Workshop at ICLR.' },
      { date: 'Mar 2026', type: 'Talk', textHtml: 'Presented “Outlier-Aware Quantization” at Stanford’s Tambe Lab.' },
      { date: 'Jan 2026', type: 'Talk', textHtml: 'Invited research talk at A*STAR, Singapore.' },
      { date: 'Dec 2025', type: 'Talk', textHtml: 'Presented ThinKV at NVIDIA in Santa Clara.' },
      { date: 'Oct 2025', type: 'Paper', textHtml: 'OuroMamba appeared at <strong>ICCV 2025</strong>.' },
      { date: 'Aug 2025', type: 'Award', textHtml: 'FLOW + FlexCiM received the <strong>ISLPED Best Paper Award</strong>.' },
      { date: 'Aug 2025', type: 'Talk', textHtml: 'Invited talk on efficient AI at Apple in Cupertino.' },
      { date: 'Jul 2025', type: 'Talk', textHtml: 'Presented quantized accelerator research to Google TPU and NVIDIA teams.' },
      { date: 'Jun 2025', type: 'Paper', textHtml: 'MicroScopiQ presented at <strong>ISCA 2025</strong> in Tokyo.' },
      { date: 'Mar 2025', type: 'Paper', textHtml: 'AIrchitect v2 presented at DATE in Lyon.' },
      { date: 'Nov 2024', type: 'Award', textHtml: 'Won second place in the ACM Student Research Competition at MICRO.' },
      { date: 'Oct 2024', type: 'Paper', textHtml: 'CLAMP-ViT presented at <strong>ECCV 2024</strong>.' }
    ]
  },

  awards: {
    headingHtml: 'Awards and recognition.',
    items: [
      { year: '2026', title: 'MLCommons Rising Star', description: 'Emerging leader in ML and systems research' },
      { year: '2025', title: 'Best Paper', description: 'ACM/IEEE ISLPED' },
      { year: '2024', title: 'ACM SRC', description: 'Second place at MICRO' },
      { year: '2024', title: 'DAC Young Fellow', description: 'Class of 2024' },
      { year: '2023', title: 'Best Paper Nominee', description: 'Top 5% of Samsung advanced research' },
      { year: '2022', title: 'Best Thesis', description: 'Electrical Engineering, VJTI' },
      { year: '2022', title: 'Samsung Spot Award', description: 'AR/VR algorithms for Galaxy devices' },
      { year: '2022', title: 'Professional SW Competency', description: 'Global Samsung Aptitude Test' },
      { year: '2022', title: 'Electrothon', description: 'Second place' },
      { year: '2021', title: 'Vision Beyond Limits', description: 'Second place' },
      { year: '2021', title: 'E-Yantra Robotics', description: 'Second place internationally' }
    ]
  },

  contact: {
    headingHtml: 'Building the next<br>generation of efficient<br><em>AI systems</em>',
    summary: 'I work across algorithms, system kernels, and hardware to make foundation-model inference more efficient. If you’re building at that intersection, I’d love to connect.',
    service: {
      label: 'Community service',
      description: 'I hold guidance sessions for undergraduate and graduate students navigating research and careers.',
      linkLabel: 'Request a session',
      url: 'https://forms.gle/JZUd3YvUA56ADK9fA'
    },
    footerTagline: 'Architecting intelligence',
    links: [
      { label: 'Google Scholar', hrefKey: 'scholar' },
      { label: 'LinkedIn', hrefKey: 'linkedin' },
      { label: 'GitHub', hrefKey: 'github' },
      { label: 'Curriculum Vitae', hrefKey: 'cv' }
    ]
  },

  // One entry per scroll chapter. These values drive the chip progress rail.
  journey: [
    { name: 'INPUT' },
    { name: 'INGRESS DMA' },
    { name: 'GLOBAL SRAM' },
    { name: 'MAC ARRAY' },
    { name: 'ACCUMULATE' },
    { name: 'VECTOR OPS' },
    { name: 'ACTIVATION' },
    { name: 'RESULT' }
  ]
};
