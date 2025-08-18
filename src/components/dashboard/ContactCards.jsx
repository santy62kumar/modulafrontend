// client/src/components/dashboard/ContactCards.jsx
import React from 'react';

const ContactCards = ({ stageId, odooLead }) => {
  const getContactInfo = () => {
    // Extract real data from Odoo lead
    const contacts = {
      mainContact: {
        name: odooLead.data?.x_studio_sales_poc_1 || 'John Doe',
        designation: 'Sales POC',
        phone: odooLead.data?.x_studio_sales_poc_mob_no_1 || '+91 98765 43210',
        email: odooLead.data?.email_from || 'john.doe@modula.com',
        assigned: !!(odooLead.data?.x_studio_sales_poc_1 && odooLead.data?.x_studio_sales_poc_mob_no_1),
        avatar: getInitials(odooLead.data?.x_studio_sales_poc_1) || 'JD'
      },
      installationSupervisor: {
        // Show supervisor info only for stages [21,10,22,11,12,26,27] as per PDF
        name: (shouldShowSupervisor(stageId) && odooLead.data?.x_studio_supervisor_1) 
          ? odooLead.data.x_studio_supervisor_1 
          : 'To be assigned',
        designation: 'Fitter Installation Partner',
        phone: (shouldShowSupervisor(stageId) && odooLead.data?.x_studio_installation_poc_no_1) 
          ? odooLead.data.x_studio_installation_poc_no_1 
          : 'N/A',
        email: 'N/A', // Not available in Odoo fields
        assigned: shouldShowSupervisor(stageId) && !!(odooLead.data?.x_studio_supervisor_1 && odooLead.data?.x_studio_installation_poc_no_1),
        scheduledDate: shouldShowSupervisor(stageId) ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) : null,
        avatar: (shouldShowSupervisor(stageId) && odooLead.data?.x_studio_supervisor_1) 
          ? getInitials(odooLead.data.x_studio_supervisor_1) 
          : '?'
      }
    };
    
    return contacts;
  };

  // Helper function to get initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to determine if supervisor should be shown
  const shouldShowSupervisor = (stageId) => {
    // As per PDF: supervisor available after stages [21,10,22,11,12,26,27]
    return [21, 10, 22, 11, 12, 26, 27].includes(stageId);
  };

  const contacts = getContactInfo();

  const ContactCard = ({ title, contact, type }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-primary-200 transition-colors duration-200">
        {/* Card Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-primary-500 font-montserrat">
            {title}
          </h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            contact.assigned 
              ? 'bg-primary-500 text-white' 
              : 'bg-primary-500 text-white'
          }`}>
            {contact.assigned ? 'Assigned' : 'Not Assigned'}
          </span>
        </div>

        {/* Contact Avatar and Name */}
        {/* Contact Avatar, Name, and Phone */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold font-montserrat ${
                contact.assigned ? 'bg-primary-500' : 'bg-gray-400'
              }`}>
                {contact.avatar}
              </div>
              <div>
                <div className={`text-lg font-semibold font-montserrat ${
                  contact.assigned ? 'text-primary-500' : 'text-gray-500'
                }`}>
                  {contact.name}
                </div>
              </div>
            </div>

            {/* Phone aligned to right */}
            {contact.assigned && (
              <div className="flex-1 text-right">
                
                <div className="text-sm font-medium text-primary-500 font-nunito">
                  Contact No:  {contact.phone}
                </div>
              </div>
            )}
          </div>


        {/* Contact Information */}
        

        {/* Not Assigned State */}
        {!contact.assigned && (
          <div className="text-center py-4">
            <div className="text-sm text-gray-500 font-nunito mb-3">
              Contact person will be assigned soon
            </div>
            <button className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors duration-200 font-nunito">
              Request Assignment
            </button>
          </div>
        )}

        {/* Action Buttons */}
        {/* {contact.assigned && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex space-x-2">
              <button className="flex-1 bg-primary-500 text-white py-2 px-3 rounded text-xs font-semibold hover:bg-primary-600 transition-colors duration-200 font-nunito">
                WhatsApp
              </button>
              <button className="flex-1 bg-primary-100 text-primary-500 py-2 px-3 rounded text-xs font-semibold hover:bg-primary-200 transition-colors duration-200 font-nunito">
                SMS
              </button>
            </div>
          </div>
        )} */}
      </div>
    );
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-primary-500 font-montserrat mb-4">
        Contact Information
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContactCard
          title="Sales POC"
          contact={contacts.mainContact}
          type="main"
        />
        
        <ContactCard
          title="Installation Supervisor"
          contact={contacts.installationSupervisor}
          type="installation"
        />
      </div>

      {/* Emergency Contact */}
      {/* <div className="mt-6 bg-primary-50 rounded-lg p-4 border border-primary-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm">
            🚨
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-primary-500 font-montserrat">
              Emergency Support
            </h4>
            <p className="text-xs text-primary-400 font-nunito">
              24/7 customer support for urgent queries
            </p>
          </div>
          <div className="text-sm font-semibold text-primary-500 font-montserrat">
            +91 62052 81574
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ContactCards;