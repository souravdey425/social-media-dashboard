import { useAuth } from "@clerk/clerk-react";
import TypewriterComponent from "typewriter-effect";

function App() {
 const{isSignedIn}= useAuth()
  return (
    <div>
    <div className=" bg-gray-500">
  
  <div className="p-4 bg-transparent flex items-center justify-between">
      <a href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          {/* <img fill alt="Logo" src="/logo.png" /> */}
        </div>
        <h1 className="text-2xl font-bold text-white">
          Ask Me
        </h1>
      </a>
      <div className="flex items-center gap-x-2 bg-white border-none p-3 rounded-2xl">
        <a href={isSignedIn ? "/home" : "/sign-up"}>
          <button>
            Get Started
          </button>
        </a>
      </div>
    </div>
    </div>

  <div className="text-white font-bold py-36 text-center space-y-5">
  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
    <h1>The Best AI Tool for</h1>
    <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
      <TypewriterComponent
        options={{
          strings: [
            "Rent bill",
            "Electricity bill",
            "Phone Recharge",
            "Pay EMI"
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  </div>
  <div className="text-sm md:text-xl font-light text-zinc-400">
    Create content using AI 10x faster.
  </div>
  <div>
    <a href={isSignedIn ? "/dashboard" : "/sign-up"}>
      <button  className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
        Start Generating For Free
      </button>
    </a>
  </div>
  <div className="text-zinc-400 text-xs md:text-sm font-normal">
    No credit card required.
  </div>
</div>
   </div>
  );
}

export default App;