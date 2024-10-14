import PageHeader from './PageHeader'

const SidebarHeader = ({title, backArrowVisible, bell }) => {
  return (
    <PageHeader title={title} backArrowVisible={backArrowVisible} bell={bell}/>
  )
}

export default SidebarHeader