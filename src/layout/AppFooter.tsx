import Image from "next/image";

const AppFooter = () => {
  return (
    <div className="layout-footer">
      Powered by
      <Image className="ml-1" src="/img/otelmoodlogo.png" alt="Logo" width={80} height={80} />
    </div>
  );
};

export default AppFooter;
