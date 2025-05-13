import Card from "../components/Card";
import Header from "../components/Header";
import banner from '../assets/Banner.avif';
import Footer from "../components/Footer";
function Home() {
  return (
    <div className="bg-gray-50 h-[100vh] w-[100vw] overflow-x-hidden ">
      <div className="h-[10%] w-[100%]">
        <Header />
      </div>
      <div className="h-[90%] w-[100%]">
        <div className="h-[80%] w-[100%] bg-cover bg-center 0 mb-6 flex justify-center items-center"
           style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="text-5xl font-bold">
            Info App
          </div>

        </div>
        <div className="container mx-auto px-4">
          <Card title={"Sample"} subtitle={"This is sample text"} imageUrl={"https://images.unsplash.com/photo-1746802401350-b99c6e692a05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"}/>
        </div>
        <Footer className="w-full "/>
      </div>
    </div>
  );
}

export default Home;
