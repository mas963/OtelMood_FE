import AppMenu from "./AppMenu"

const AppSidebar = () => {
  return (
    <>
      <AppMenu />
      <div className="flex items-center justify-center
       gap-3 p-2 border-top bg-primary text-gray-100 rounded">
        <i className="pi pi-database"></i>
        <span>Akdeniz Otel (11111)</span>
      </div>
    </>
  )
}

export default AppSidebar;