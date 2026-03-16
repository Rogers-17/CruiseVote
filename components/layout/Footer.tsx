

import React from 'react';
import {
  Play,
  Youtube,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

interface FooterLink {
  name: string;
  href: string;
}

interface FooterLinksProps {
  product: FooterLink[];
  company: FooterLink[];
  resources: FooterLink[];
  legal: FooterLink[];
}

interface SocialLink {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  label: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks: FooterLinksProps = {
    product: [
      { name: 'Features', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'API', href: '#' },
      { name: 'Mobile App', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' },
    ],
    resources: [
      { name: 'Help Center', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Guidelines', href: '#' },
      { name: 'Creator Hub', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Security', href: '#' },
    ],
  };

  const socialLinks: SocialLink[] = [
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="border-t border-slate-800 bg-linear-to-b from-slate-900 to-slate-950 text-gray-300 md:ml-64 lg:w-[calc(100%-16rem)]">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top Section */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <span className="bg-linear-to-r from-purple-600 to-pink-400 bg-clip-text text-xl font-bold text-transparent md:text-4xl">
                ClipCast
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Your premier destination for video streaming and content creation.
              Join millions of creators and viewers worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-red-500" />
                <span>support@clipcast.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-red-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-block text-sm transition-colors duration-200 hover:translate-x-1 hover:text-red-500"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-block text-sm transition-colors duration-200 hover:translate-x-1 hover:text-red-500"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-block text-sm transition-colors duration-200 hover:translate-x-1 hover:text-red-500"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-white uppercase">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-block text-sm transition-colors duration-200 hover:translate-x-1 hover:text-red-500"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-12 rounded-xl border border-slate-700 bg-slate-800/50 p-8">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="mb-2 text-xl font-semibold text-white">
              Stay Updated
            </h3>
            <p className="mb-6 text-sm text-gray-400">
              Subscribe to our newsletter for the latest updates, features, and
              creator tips.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-3 md:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm transition-colors focus:border-red-500 focus:outline-none"
              />
              <button className="rounded-lg bg-linear-to-r from-red-500 to-pink-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-slate-800 pt-8 md:flex-col lg:flex-row">
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            © {currentYear} ClipCast. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-all duration-200 hover:scale-110 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <select className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm transition-colors focus:border-red-500 focus:outline-none">
              <option>🇺🇸 English</option>
              <option>🇪🇸 Español</option>
              <option>🇫🇷 Français</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
