import UserCard from "@/components/cards/UserCard";
import Filters from "@/components/sheared/Filters";
import LocalSearch from "@/components/sheared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getAllUsers } from "@/lib/actions/user.action";
import Link from "next/link";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/sheared/Pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Dev Overflow",
  description: "Dev Overflow is a community of developers. Join us",
};

const page = async ({ searchParams }: SearchParamsProps) => {
  // let result;
  // TODO:ERROR WHILE DEPLOYMENT ON APP
  const result = await getAllUsers({
    searchQuery: searchParams?.q,
    filter: searchParams?.filter,
    page: searchParams.page ? +searchParams.page : 1,
    pageSize: searchParams.pageSize ? +searchParams.pageSize : 20,
  });

  return (
    <>
      <div>
        <h1 className='h1-bold text-dark100_light900'>All Users</h1>
        <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
          <LocalSearch
            route='/community'
            icon='/assets/icons/search.svg'
            placeholder='Search by username...'
            iconPosition='left'
          />
          <Filters
            filters={UserFilters}
            otherClasses='min-h-[56px] sm:min-w-[170px]'
          />
        </div>
      </div>

      <section className='mt-12 flex flex-wrap gap-4'>
        {result && result.users.length > 0 ? (
          result.users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
            />
          ))
        ) : (
          <div className='paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center'>
            <p>No users yet</p>
            <Link
              href='/sign-up'
              className='mt-2 font-bold text-accent-blue'
            >
              Join to be the first
            </Link>
          </div>
        )}
      </section>

      {/* pagination */}
      {result && result?.users.length > 0 && (
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result?.isNext}
        />
      )}
    </>
  );
};

export default page;
