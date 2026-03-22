'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './RecentProjects.css';

// ============= IMPORT ALL IMAGES =============
import limsFigma1 from '../../../images/Figma (1).png';
import limsFigma2 from '../../../images/Figma (2).png';
import limsFigma3 from '../../../images/Figma (3).png';
import limsFigma4 from '../../../images/Figma (4).png';
import limsFigma5 from '../../../images/Figma (5).png';
import limsFigma6 from '../../../images/Figma (6).png';
import limsFigma7 from '../../../images/Figma (7).png';
import limsDashboard from '../../../images/Lims D.png';
import wemsDashboard from '../../../images/Wedding D.png';
import limsAmharic from '../../../images/lims p Amharic.png';
import limsArabic1 from '../../../images/Arabic (1).png';
import limsArabic2 from '../../../images/Arabic (2).png';
import wemsDashboardAlt from '../../../images/Wems p.png';
import limsExtra1 from '../../../images/lims p (1).png';
import limsExtra2 from '../../../images/lims p (2).png';
import wemsExtra from '../../../images/lims p (3).png';
import wemsVendor from '../../../images/lims p (5).png';
// ============================================

// Figma designs (7 images) – only these appear in the slider
const figmaProjects = [
 
        {
          id: 1,
          title: 'LIMS - Reports & Analytics',
          description: 'The analytics module provides comprehensive reports for management and quality control. Users can generate custom reports with multiple filters, export data to PDF or Excel, and schedule automatic report delivery. The design includes a dashboard with key performance indicators (KPIs) such as average turnaround time, test volume per day, and technician workload. All reports are visually rich and can be shared securely.',
          category: 'LIMS',
          tags: ['Figma', 'UI/UX', 'Data Analytics'],
          image: limsFigma1,
        },
        {
          id: 2,
          title: 'LIMS - Performance Matrix',
          description: 'A dedicated performance matrix dashboard that tracks key lab metrics: sample processing times, technician efficiency, instrument uptime, and turnaround delays. The interface uses color‑coded gauges and trend lines to highlight areas needing improvement. Managers can drill down into individual performance data and export performance reports for review.',
          category: 'LIMS',
          tags: ['Figma', 'UI/UX', 'Performance', 'Analytics'],
          image: limsFigma2,
        },
        {
          id: 3,
          title: 'LIMS - Custom Report Builder',
          description: 'Empower users to create their own reports with a drag‑and‑drop builder. Choose from a wide range of data fields (patient, tests, results, time periods) and apply advanced filters. Reports can be saved as templates, shared with colleagues, and scheduled for automated delivery. The interface includes a live preview and supports multiple output formats (PDF, Excel, CSV).',
          category: 'LIMS',
          tags: ['Figma', 'UI/UX', 'Reporting', 'Customization'],
          image: limsFigma3,
        },
        {
          id: 4,
          title: 'LIMS - Inventory Tracking',
          description: 'Manage laboratory inventory (reagents, consumables, glassware) with real‑time stock levels, low‑stock alerts, and reorder suggestions. The system tracks batch numbers, expiry dates, and usage history. A visual dashboard shows consumption trends, and staff can initiate purchase orders directly from the interface. Barcode scanning simplifies item check‑in/out.',
          category: 'LIMS',
          tags: ['Figma', 'UI/UX', 'Inventory', 'Stock Management'],
          image: limsFigma4,
        },
        {
          id: 5,
          title: 'LIMS - Equipment Management',
          description: 'Track all laboratory equipment – from pipettes to analyzers – with maintenance schedules, calibration records, and service history. The module displays real‑time equipment status (available, in use, under maintenance) and sends reminders for upcoming calibrations. Users can log issues, attach documents, and generate equipment usage reports.',
          category: 'LIMS',
          tags: ['Figma', 'UI/UX', 'Equipment', 'Maintenance'],
          image: limsFigma5,
        },
        {
          id: 6,
          title: 'LIMS - Consumables Inventory',
          description: 'Focused on managing consumables such as gloves, tubes, and swabs. The interface provides a clear view of stock levels per location, low‑stock thresholds, and automatic reorder suggestions. Staff can record consumption during test runs, and the system adjusts inventory in real time. Procurement can be initiated with one click.',
          category: 'LIMS',
          tags: ['Figma', 'UI/UX', 'Inventory', 'Consumables'],
          image: limsFigma6,
        },
        {
          id: 7,
          title: 'LIMS - Sample Management',
          description: 'End‑to‑end sample tracking from registration to disposal. The screen uses a Kanban board to visualise samples by stage: collected, in transit, processing, completed, archived. Each card displays sample ID, patient name, test type, and priority. Staff can drag cards to update status, and the system logs every action for full audit traceability. Barcode scanning ensures error‑free entry.',
          category: 'LIMS',
          tags: ['Figma', 'UI/UX', 'Sample Tracking', 'Workflow'],
          image: limsFigma7,
        },
      ];

const dashboardProjects = [
  {
    id: 8,
    title: 'LIMS Dashboard (Live)',
    description: 'This is the actual dashboard built with React, Node.js, and PostgreSQL. It shows real‑time metrics: total samples processed today, pending tests, average turnaround time, and a breakdown by department. Charts update every minute, and the layout is fully customisable per user. The dashboard also integrates with laboratory instruments via HL7 interface, automatically populating results as they come in. The live version is deployed on AWS and serves over 500 users daily.',
    category: 'LIMS',
    tags: ['Dashboard', 'Production', 'React'],
    image: limsDashboard,
  },
  {
    id: 9,
    title: 'WEMS Dashboard',
    description: 'The Wedding Event Management System (WEMS) dashboard gives event planners a bird’s‑eye view of all weddings. It displays upcoming events, vendor lists, budget overview, and task progress. The dashboard uses a drag‑and‑drop calendar for scheduling and a notification centre for reminders. Financial graphs show income vs. expenses, and there’s a client portal where couples can view their wedding timeline and make requests.',
    category: 'WEMS',
    tags: ['Dashboard', 'Production', 'Event Management'],
    image: wemsDashboard,
  },
  {
    id: 13,
    title: 'WEMS Dashboard - Alternate View',
    description: 'An alternative view of the WEMS dashboard that focuses on vendor management and budget tracking. This layout presents vendor profiles, contracts, and payment schedules in a side panel. The main area shows a Gantt chart for vendor tasks, helping planners coordinate deliveries and services. The interface also includes a vendor rating system based on previous performance.',
    category: 'WEMS',
    tags: ['Dashboard', 'Vendor Management'],
    image: wemsDashboardAlt,
  },
];

const localizationProjects = [
  {
    id: 10,
    title: 'Amharic Language Support',
    description: 'To serve Ethiopian users, we localised the entire LIMS into Amharic. This involved translating all UI strings, adjusting layout for Amharic script (which flows left‑to‑right), and using appropriate fonts. The system also supports Amharic data entry and reporting. Localisation was done in collaboration with Ethiopian lab technicians to ensure accuracy and cultural relevance. The result is a system that feels native and improves adoption.',
    category: 'LIMS',
    tags: ['Localization', 'Amharic'],
    image: limsAmharic,
  },
  {
    id: 11,
    title: 'Arabic Support - UI',
    description: 'For Arabic‑speaking users, we implemented full right‑to‑left (RTL) layout. All menus, buttons, and forms mirror correctly, and date formats follow Arabic conventions. The translation covers all modules, including navigation, error messages, and tooltips. Special care was taken to handle Arabic pluralisation and punctuation. The interface is visually consistent with the original but respects cultural preferences.',
    category: 'LIMS',
    tags: ['Localization', 'Arabic', 'RTL'],
    image: limsArabic1,
  },
  {
    id: 12,
    title: 'Arabic Support - Reports',
    description: 'Reports generated by the system can be produced in Arabic. This includes lab results, patient summaries, and management reports. The PDF and Excel exports preserve the RTL orientation and use Arabic numerals. We also added a toggle for users to switch between languages on the fly, making the system accessible to both Arabic and English speakers without restarting.',
    category: 'LIMS',
    tags: ['Localization', 'Arabic', 'Reporting'],
    image: limsArabic2,
  },
];

const additionalProjects = [
    {
      id: 14,
      title: 'LIMS - Financial Management',
      description: 'Complete financial management module that handles invoicing, payments, and revenue tracking. It automatically generates bills based on tests ordered, applies insurance or discounts, and integrates with local payment gateways (Chapa, CBE Birr). Users can view outstanding balances, payment history, and generate financial reports. The dashboard provides a clear overview of daily collections, pending payments, and overall lab revenue.',
      category: 'LIMS',
      tags: ['Financial', 'Billing', 'Invoicing'],
      image: limsExtra1,
    },
    {
      id: 15,
      title: 'LIMS - Inventory Management',
      description: 'Comprehensive inventory tracking for reagents, consumables, and equipment. Features include real‑time stock levels, low‑stock alerts, expiry date tracking, and purchase order management. Barcode scanning simplifies item check‑in/out, and the system records usage per test to help forecast future needs. A visual dashboard shows consumption trends and helps prevent shortages.',
      category: 'LIMS',
      tags: ['Inventory', 'Stock', 'Supplies'],
      image: limsExtra2,
    },
    {
      id: 16,
      title: 'WEMS - Inventory Dashboard',
      description: 'Manage all wedding‑related inventory: decorations, tableware, linens, lighting, and more. The dashboard shows current stock, items allocated to upcoming events, and low‑stock warnings. Planners can reserve items for specific weddings, track returns, and reorder supplies directly from the interface. A calendar view helps visualise item usage across multiple events.',
      category: 'WEMS',
      tags: ['Inventory', 'Wedding', 'Supplies'],
      image: wemsExtra,
    },
    {
      id: 17,
      title: 'WEMS - Lab Tech Dashboard',
      description: 'A specialised dashboard for managing event technology equipment such as sound systems, lighting, projectors, and staging. It displays equipment availability, maintenance schedules, and technical requirements for each event. Technicians can log issues, update statuses, and ensure all technical setups are delivered on time. The dashboard integrates with vendor schedules to avoid conflicts.',
      category: 'WEMS',
      tags: ['Technology', 'Equipment', 'Event Tech'],
      image: wemsVendor,
    },
  ];

export default function OurServicesPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main>
     

      {/* Section 1: Dashboard Showcase – Large alternating rows */}
      <section className="section-dashboard">
        <div className="container">
          <div className="section-header">
            <h2>Real‑world Dashboards</h2>
            <p>Live, production‑ready dashboards built with modern frameworks and deployed to the cloud.</p>
          </div>
          <div className="showcase-rows">
            {dashboardProjects.map((project, idx) => (
              <div key={project.id} className={`showcase-row ${idx % 2 === 0 ? 'row-left' : 'row-right'}`}>
                <div className="showcase-image">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                </div>
                <div className="showcase-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="showcase-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 {/* Section 2: Figma Designs – 70/30 split slider (only the 7 Figma images) */}
 <div className="slider-page figma-slider">
        <div className="slider-container">
          <Swiper
            modules={[Navigation, Pagination, Keyboard, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true, dynamicBullets: true }}
            keyboard={{ enabled: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="full-swiper"
          >
            {figmaProjects.map((project, idx) => (
              <SwiperSlide key={project.id}>
                <div className="slide-content-split">
                  <div className="slide-image-split">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain"
                      priority={idx === 0}
                      quality={100}           // maximum quality
  unoptimized={true}      // bypass Next.js image optimization
                    />
                  </div>
                  <div className="slide-text-split">
                    <div className="text-inner">
                      <span className="slide-category">{project.category}</span>
                      <h2 className="slide-title">{project.title}</h2>
                      <p className="slide-description">{project.description}</p>
                      <div className="slide-tags">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="tag">{tag}</span>
                        ))}
                      </div>
                      <div className="slide-counter">
                        {activeIndex + 1} / {figmaProjects.length}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Section 3: Localization – Large alternating rows */}
      <section className="section-localization">
        <div className="container">
          <div className="section-header">
            <h2>Multilingual Support</h2>
            <p>Localised interfaces for Amharic and Arabic, including full RTL support and culturally adapted content.</p>
          </div>
          <div className="showcase-rows">
            {localizationProjects.map((project, idx) => (
              <div key={project.id} className={`showcase-row ${idx % 2 === 0 ? 'row-left' : 'row-right'}`}>
                <div className="showcase-image">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                </div>
                <div className="showcase-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="showcase-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Enhanced Functionality – Now also uses the alternating rows layout */}
      <section className="section-features">
        <div className="container">
          <div className="section-header">
            <h2>Enhanced Functionality</h2>
            <p>Specialised modules that extend the core systems.</p>
          </div>
          <div className="showcase-rows">
            {additionalProjects.map((project, idx) => (
              <div key={project.id} className={`showcase-row ${idx % 2 === 0 ? 'row-left' : 'row-right'}`}>
                <div className="showcase-image">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                </div>
                <div className="showcase-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="showcase-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}