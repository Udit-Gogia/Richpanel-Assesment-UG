import Link from 'next/link'

export default function Home() {

  return (
    <div className="w-screen h-screen bg-primaryBlue font-mont flex flex-col gap-8 items-center justify-center">
      <h1 className={`text-7xl text-white  font-bold`}>Richpanel Assesment</h1>

      <section className="flex gap-4 items-center">
        <Link
          href="/auth/login"
          className="bg-white px-8 py-2 rounded-md text-primaryBlue font-semibold text-lg hover:underline"
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="bg-white px-8 py-2 rounded-md text-primaryBlue font-semibold text-lg hover:underline"
        >
          Signup
        </Link>



      </section>



    </div >
  )
}
