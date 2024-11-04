export default function Footer() {
  return (
    <footer className="bg-black/50 border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">Bar Bus GR</h3>
            <p className="text-white/60">Your Ultimate Party Ride in Grand Rapids</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-white/60 hover:text-white">About Us</a></li>
              <li><a href="/events" className="text-white/60 hover:text-white">Events</a></li>
              <li><a href="/routes" className="text-white/60 hover:text-white">Routes</a></li>
              <li><a href="/rental" className="text-white/60 hover:text-white">Book Now</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-white/60">Grand Rapids, MI</li>
              <li><a href="mailto:info@barbus-gr.com" className="text-white/60 hover:text-white">info@barbus-gr.com</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Employee Portal</h3>
            <ul className="space-y-2">
              <li><a href="/employee/login" className="text-white/60 hover:text-white">Employee Login</a></li>
              <li><a href="/careers" className="text-white/60 hover:text-white">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Bar Bus GR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}