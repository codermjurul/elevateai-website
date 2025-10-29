import { Calendar, Linkedin, Youtube } from 'lucide-react';
import logo from '../logo/Elevate AI logo.svg';

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/10 footer-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="space-y-6">
            <div>
              <img src={logo} alt="Elevate AI" className="h-10 w-auto mb-4" />
              <h3 className="text-xl font-light text-white mb-4">Get In Touch</h3>
            </div>

            <div>
              <a
                href="mailto:elevateai14@gmail.com"
                className="text-accent-teal hover:text-accent-teal/80 transition-colors duration-300 text-lg"
              >
                elevateai14@gmail.com
              </a>
            </div>

            <div>
              <a
                href="https://cal.com/manjarul-ch/free-consultation-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white hover:text-accent-teal transition-colors duration-300 group"
              >
                <Calendar className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm font-medium border-b border-transparent group-hover:border-accent-teal transition-all duration-300">
                  Book Your Free Consultation
                </span>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-light text-white mb-4">Connect & Learn</h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4 group">
                <Linkedin className="w-6 h-6 text-accent-teal flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <a
                    href="https://www.linkedin.com/in/manjarul-hoque-chowdhury-499127323"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-accent-teal transition-colors duration-300 font-medium block mb-1"
                  >
                    LinkedIn
                  </a>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Connect with Manjarul on LinkedIn for insights and professional networking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <Youtube className="w-6 h-6 text-accent-teal flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <a
                    href="https://www.youtube.com/@ManjarulCh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-accent-teal transition-colors duration-300 font-medium block mb-1"
                  >
                    YouTube
                  </a>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Explore our YouTube channel for free guides on how AI can transform your business.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-light text-white mb-4">Legal</h3>

            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-base w-fit border-b border-transparent hover:border-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-base w-fit border-b border-transparent hover:border-white"
              >
                Terms of Service
              </a>
            </div>

            <div className="pt-4">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Elevate AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
