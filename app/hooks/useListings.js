import {listingContract} from "../hooks/useContracts"

let listingsLoading = false
let status = {error: false, success: false, message: ""}
let listings = await fetchAllListing()


async function fetchAllListing(){
    listingsLoading = true
    let all_listings = await listingContract?.getAllListing()
    listingsLoading = false
    return all_listings
}

export {listings, listingsLoading, status}