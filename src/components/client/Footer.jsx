import { Link } from "react-router"


const Footer = () => {
  return (
    <div>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-20 pl-20 bg-[#333333]   text-white py-20">
                
                <div>
                    <h2 className="text-2xl font-bold mb-3">Bazarly</h2>
                    <p>Your trusted online marketplace for everyday essentials. Quality products, great prices, fast delivery.</p>
                </div>
                <div>
                    <ul>
                        <li className="font-bold mb-3">Quick Links</li>
                        <Link  to="/" > <li className="mb-2 hover:cursor-pointer hover:underline">Home</li></Link >

                        <Link to="/about" ><li className="mb-2 hover:cursor-pointer hover:underline">About</li></Link >
                        <Link  to="/products" > <li className="mb-2 hover:cursor-pointer hover:underline">Products</li></Link >
                        <Link  to="/contact" >  <li className="mb-2 hover:cursor-pointer hover:underline">Contact</li></Link >
                    </ul>
                </div>
                <div>
                    <h2 className="font-bold mb-3">Categories</h2>
                    <div className="flex flex-col">
                        <span className="mb-2">Electronics</span>
                        <span className="mb-2">Clothing</span>
                        <span className="mb-2">Shoes</span>
                        <span className="mb-2">Home-Accessories</span>
                        <span className="mb-2">Accessories</span>
                    </div>
                
                </div>
                <div>
                        <h2 className="font-bold mb-3">Contact Info</h2>
                        <div className="flex flex-col">
                            <span className="mb-2">info@bazarly.com</span>
                            <span className="mb-2">+1 (555) 123-4567</span>
                            <span className="mb-2">123 Commerce St, City, State 12345</span>

                        </div>
                    </div>
                    <span>© 2024 Bazarly. All rights reserved.</span>
            </div>

            </div>
  )
}

export default Footer
