import MainCustomer from '../components/MainCustomer'
import SidebarHeader from '../components/SidebarHeader';

const Customer = () => {
  const pageTitle = ('Customer')
  
  return (
    <>
      <SidebarHeader title={pageTitle} backArrowVisible={false}/>
      <div className={`page-container d-flex flex-column `}>
        <MainCustomer/>
      </div>
    </>
  )
}

export default Customer