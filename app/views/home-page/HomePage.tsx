import Button from "../../components/button/Button";
import Banner from "../../images/banner.png";
import CardThumbnail from "../../images/card-thumnail.png";
import { Link, useLoaderData } from "@remix-run/react";

export default function HomePage() {
  const data = useLoaderData() as { userId: string | undefined };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <img src={Banner} alt="banner" className="h-auto w-full" />
      <div className="mb-8 mt-6 flex w-11/12 flex-col items-center justify-center lg:mb-14 lg:mt-12">
        <div className="mb-4 w-full text-center text-2xl font-bold uppercase italic text-primary lg:mb-8 lg:text-3xl">
          Let Us Simplify Your Expense Management Journey!
        </div>
        <div className="mb-4 grid grid-cols-1 gap-5 lg:mb-8 lg:grid-cols-3 lg:gap-10">
          <div className="flex w-full max-w-96 flex-col items-center justify-center rounded-xl border-2 border-primary text-center">
            <img
              src={CardThumbnail}
              alt="card-thumbnail"
              className="h-auto w-full object-cover"
            />
            <div className="px-3 pb-4 lg:px-5 lg:pb-10 lg:pt-2">
              <div className="mb-2.5 text-xl font-bold text-accent-yellow lg:mb-4 lg:text-2xl">
                STORE
              </div>
              <div>
                Seamless Expense Tracking: Record your expenditures on-the-go
                with a user-friendly interface, ensuring you never miss a
                transaction.
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-96 flex-col items-center justify-center rounded-xl border-2 border-primary text-center">
            <img
              src={CardThumbnail}
              alt="card-thumbnail"
              className="h-auto w-full object-cover"
            />
            <div className="px-3 pb-4 lg:px-5 lg:pb-10 lg:pt-2">
              <div className="mb-2.5 text-xl font-bold text-accent-yellow lg:mb-4 lg:text-2xl">
                ANALYSE
              </div>
              <div>
                Seamless Expense Tracking: Record your expenditures on-the-go
                with a user-friendly interface, ensuring you never miss a
                transaction.
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-96 flex-col items-center justify-center rounded-xl border-2 border-primary text-center">
            <img
              src={CardThumbnail}
              alt="card-thumbnail"
              className="h-auto w-full object-cover"
            />
            <div className="px-3 pb-4 lg:px-5 lg:pb-10 lg:pt-2">
              <div className="mb-2.5 text-xl font-bold text-accent-yellow lg:mb-4 lg:text-2xl">
                FREE TRIAL
              </div>
              <div>
                Seamless Expense Tracking: Record your expenditures on-the-go
                with a user-friendly interface, ensuring you never miss a
                transaction.
              </div>
            </div>
          </div>
        </div>
        <Link to={data?.userId ? "/wallet" : "/auth?mode=signup"}>
          <Button className="lg:text-xl">
            {!data?.userId ? "Sign Up Now!" : "Create Your Expense Now!"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
