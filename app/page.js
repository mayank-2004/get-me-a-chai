import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-white flex justify-center items-center gap-4 flex-col min-h-[40vh] px-5 md:px-0 text-xs md:text-base">
        <div className="md:text-5xl text-3xl font-bold flex justify-center items-center gap-2">
          <span className="text-4xl">Get me a Chai!</span>
          <img className="rounded-full" width={60} src="/giphy.webp" alt="" />
        </div>
        <p className="text-lg">A crowdfunding platform for creators. Get funded by your fans and followers.</p>
        <div>
          <Link href={"/login"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button></Link>

          <Link href={"/about"}>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button></Link>
        </div>
      </div>
      <div className="bg-white h-[3px] opacity-10"></div>

      <div className=" text-white px-10">
        <h2 className="font-bold my-11 text-3xl flex justify-center">Your Fans can buy you a Chai</h2>
        <div className=" my-10 flex justify-around items-center container mx-auto gap-2">
          <div className="items flex flex-col justify-center items-center">
            <img className="rounded-full mb-3" width={80} src="man.webp" alt="man" />
            <p className="font-bold text-center">Your Fans want to help</p>
            <p className="text-center">Your Fans are available to help you</p>
          </div>
          <div className="items flex flex-col justify-center items-center">
            <img className="rounded-full mb-3" width={80} src="coin.webp" alt="man" />
            <p className="font-bold text-center">Your Fans want to Contribute</p>
            <p className="text-center">Your Fans are willing to contribute financially</p>
          </div>
          <div className="items flex flex-col justify-center items-center">
            <img className="rounded-full mb-3" width={80} src="group.webp" alt="man" />
            <p className="font-bold text-center">Your Fans want to Collaborate</p>
            <p className="text-center">Your Fans are willing to collaborate with you</p>
          </div>
        </div>
      </div>
      <div className="bg-white h-[3px] opacity-10"></div>

      <div className=" text-white flex justify-center items-center flex-col">
        <h2 className="font-bold my-11 text-3xl flex justify-center">Learn more about us</h2>
        <div className="w-[90%] h-[40vh] md:w-[50%] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]">
          <iframe className=" w-full h-full mb-12" width="560" height="315" src="https://www.youtube.com/embed/Tow6Tw0XoCg?si=FUvR5I9f_MNCir47" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </>
  );
}
