import Header from "../components/header";
import Sidebar from "../components/sidebar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body
        >
            <div className="flex w-full h-[100vh]">
              <Sidebar/>
                <div className="flex w-full flex-col h-screen">
                <Header/>
               <div className="overflow-y-auto ">
               {children}
               </div>
                </div>
           
            </div>
         
        </body>
      </html>
    );
  }
  