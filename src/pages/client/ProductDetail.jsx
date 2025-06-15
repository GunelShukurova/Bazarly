
import { GoStar } from "react-icons/go";
import FavoriteIcon from '@mui/icons-material/Favorite';
const ProductDetail = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-2">
  <button className="px-3 py-1 bg-[#ccbe94] mt-10 cursor-pointer hover:bg-[#b1a478]  text-white text-md font-semibold rounded-lg ">
                   Back to Products
                  </button>
        <div className="grid grid-cols-2 gap-16 mt-10">


          <div className="flex ">
            <img
              src="https://assets.unileversolutions.com/v1/1618992.png"
              alt="Dove Beauty Bar"
              className="w-full max-w-xl h-87 object-contain rounded-lg shadow-md"
            />
          </div>
          <div>
            <div className="bg-[#FDFBF7] p-6 rounded-lg shadow-md">
              <h3 className="text-3xl font-semibold text-[#352411b5] mb-2">Dove Beauty Bar</h3>

              <div className="text-2xl text-gray-700 mb-2">hygiene</div>

              <div className="mb-6">

                <p className="text-xl text-neutral-600 mt-2">
                  Moisturizing beauty bar soap for soft, smooth skin
                </p>
              </div>
              <div className="mb-6">

                <span className="text-2xl text-neutral-600 mt-2">$4.94</span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-700 mb-6">
                <div className="flex items-center gap-1 text-lg text-[#352411b5]">
                  <GoStar className="text-yellow-500" />
                  <GoStar className="text-yellow-500" />
                  <GoStar className="text-yellow-500" />
                  <GoStar className="text-yellow-500" />
                  <GoStar  className="text-yellow-500" />
                  <span className="ml-2 text-[#352411b5]">4.6 out of 5</span>
                </div>

                <div className="text-md font-medium text-gray-700">
                  In Stock (35 available)
                </div>
              </div>
              <div className="flex items-center justify-between text-lg font-semibold text-gray-800">
                <div className="flex items-center gap-4">
                  <span>Quantity</span>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    className="w-16 py-2 px-4 border border-gray-300 rounded-lg text-center"
                    defaultValue="1"
                  />
                </div>
                <div className="flex gap-3 text-white">
                  <button className="bg-[#ccbe94] px-6 py-2 rounded-lg">< FavoriteIcon /></button>
                  <button className="px-6 py-3 bg-[#ccbe94] cursor-pointer hover:bg-[#b1a478]  text-white text-lg font-semibold rounded-lg ">
                    Add to Cart
                  </button>
                </div>

              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-2xl sm:text-3xl  text-[#2f1f0cb5] mb-2">Reviews</h2>
                
            <div className="flex  items-center gap-4" >
              <div id="reviews" className="border-amber-900 rounded-lg pt-4  max-w-full">
                <img className="w-20 h-20 rounded-full" src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=" alt="" />
              </div>
              <div>
                <span className="text-2xl pt-1  flex flex-col ">
                  <span className="font-semibold pb-3">John Doe</span>

                </span>
                <span>
                  April 2025
                </span>
              </div>
            </div>
            <div className="flex mt-6 mb-4 ">
              <GoStar className="text-yellow-500" />
              <GoStar className="text-yellow-500" />
              <GoStar className="text-yellow-500" />
              <GoStar className="text-yellow-500" />
              <GoStar  className="text-yellow-500" />
            </div>
            <div>
              <p className="text-lg">Perfect hub for our first time in Paris. Christelle and Smail were very responsive and friendly. Apartment was compact but had everything we needed including small touches like </p>
            </div>
          </div>

          <div>
            <form className="w-full max-w-xl" id="add-review">
              <div className="flex items-center gap-4">

            
              <label htmlFor="textarea" className="font-bold text-2xl sm:text-3xl  text-[#2f1f0cb5] mb-1">
                Add Your Review
              </label>
               <div className="text-sm text-gray-700 ">
                <div className="flex items-center gap-1 text-lg text-[#352411b5] cursor-pointer">
                  <GoStar className="text-yellow-500" />
                  <GoStar className="text-yellow-500" />
                  <GoStar className="text-yellow-500" />
                  <GoStar className="text-yellow-500" />
                  <GoStar  className="text-yellow-500" />
              
                </div></div>
                  </div>
              <div id="rating-stars" className="flex gap-1 mb-3">

              </div>

              <textarea
                id="review-message"
                name="reviewMessage"
                rows="4"
                className="w-full border-2 border-gray- text-xl text-blue-950  border-[#ccbe94] rounded-lg p-3"
                placeholder="Write your review..."
              ></textarea>

              <button
                type="submit"
                className="bg-[#ccbe94] cursor-pointer hover:bg-[#ada178]  text-white mt-5 mb-10 w-60 rounded px-2 py-4 "
              >
                Submit Review
              </button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};




export default ProductDetail
