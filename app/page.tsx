import ClientOnly from "./components/clientonly";
import Container from "./components/container";
import EmptyState from "./components/emptyState";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "./components/listings/listingCard";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps{
  searchParams: IListingsParams
}

const Home = async ({ searchParams }: HomeProps) => {

  const listings = await getListings(searchParams);

  const currentUser = await getCurrentUser()

  if(!listings || listings.length === 0){
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }
  
  return (
    <ClientOnly>
      <Container>
        <div className="
          pt-24
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        ">
          {listings.map((listing) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing} 
              />
            )
})}
        </div>
      </Container>
    </ClientOnly>
  );
}

export default Home