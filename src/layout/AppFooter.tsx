import Image from "next/image";

const AppFooter = () => {
  return (
    <div className="layout-footer">
      <Image
      className="mr-2"
        src="/layout/images/logo-dark.svg"
        alt="Sakai Logo"
        width={40}
        height={40}
      />
      by
      <span className="font-medium ml-2">OtelMood</span>
    </div>
  );
};

export default AppFooter;
