import PageBanner from '../components/Common/PageBanner';
import ContactUsForm from '../components/ContactUs/ContactUsForm';

const Contact = () => {
  return (
    <>
      <PageBanner
        pageTitle='Contact Us'
        pageSubTitle='Contact us with your details & ready to start with us.'
      />

      <ContactUsForm />
    </>
  );
};

export default Contact;
