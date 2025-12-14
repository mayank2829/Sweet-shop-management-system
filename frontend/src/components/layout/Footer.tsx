import { Candy, Heart, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-candy flex items-center justify-center">
                <Candy className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold candy-text">
                Sweet Shop
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Bringing sweetness to your life since 2024. Handcrafted confections made with love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/shop?category=chocolates" className="text-muted-foreground hover:text-foreground transition-colors">
                  Chocolates
                </Link>
              </li>
              <li>
                <Link to="/shop?category=cakes" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cakes
                </Link>
              </li>
              <li>
                <Link to="/shop?category=candies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Candies
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-display font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Returns Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Chandigarh, India
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                +91 9569959560
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                adarsh.cse77@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 Sweet Shop. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> and lots of sugar
          </p>
        </div>
      </div>
    </footer>
  );
}
