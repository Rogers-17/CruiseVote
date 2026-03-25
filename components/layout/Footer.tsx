import React from 'react';
import {
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
      { name: 'Live Polls', href: '#' },
      { name: 'Contestants', href: '#' },
      { name: 'Voting FAQ', href: '#' },
      { name: 'Cruise Schedule', href: '#' },
    ],
    company: [
      { name: 'About Starz', href: '#' },
      { name: 'Events', href: '#' },
      { name: 'Partners', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    resources: [
      { name: 'Help Center', href: '#' },
      { name: 'Voting Rules', href: '#' },
      { name: 'Terms of Use', href: '#' },
      { name: 'Winner History', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Anti-Fraud', href: '#' },
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
    <footer className="border-t md:ml-64 lg:w-[calc(100%-16rem)]">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top Section */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-brand-yellow text-xl font-black tracking-tighter uppercase md:text-3xl">
                STARZ CRUISE
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed">
              Celebrating excellence and talent at Starz University. Join the
              journey to crown the next Face of Starz Cruise.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="hover:text-brand-yellow flex items-center gap-3 text-sm transition-colors">
                <Mail className="h-4 w-4 text-[--color-brand-yellow]" />
                <span>support@starzcruise.com</span>
              </div>
              <div className="hover:text-brand-yellow flex items-center gap-3 text-sm transition-colors">
                <Phone className="h-4 w-4 text-[--color-brand-yellow]" />
                <span>+231 (000) STARZ-VOTE</span>
              </div>
              <div className="hover:text-brand-yellow flex items-center gap-3 text-sm transition-colors">
                <MapPin className="h-4 w-4 text-[--color-brand-yellow]" />
                <span>Monrovia, Liberia</span>
              </div>
            </div>
          </div>

          {/* Dynamic Link Mapping */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-xs font-black tracking-widest uppercase italic">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link: FooterLink) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="inline-block text-sm transition-colors duration-200 hover:translate-x-1 hover:text-[--color-brand-yellow]"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter / Stay Updated Section */}
        <div className="mb-12 rounded-2xl border bg-white/5 p-8">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="mb-2 text-xl font-black uppercase italic">
              Don't Miss the Wave
            </h3>
            <p className="mb-6 text-sm text-gray-400">
              Get notified when new polls go live and winners are announced.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-3 md:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-xl border px-4 py-3 text-sm transition-colors focus:border-[--color-brand-yellow] focus:outline-none"
              />
              <button className="bg-brand-yellow rounded-xl px-6 py-3 font-black text-black uppercase shadow-lg shadow-yellow-500/10 transition-all duration-200 hover:scale-[1.02] active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-6 border-t pt-8 lg:flex-row">
          {/* Copyright */}
          <div className="text-sm font-medium">
            © {currentYear}{' '}
            <span className="text-[--color-brand-yellow]">Starz Cruise</span>.
            Built by Rogers
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="hover:bg-brand-yellow flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-200 hover:scale-110 hover:text-black"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Language / Region */}
          <div className="flex items-center gap-2">
            <select className="focus:border-brand-yellow cursor-pointer rounded-lg border px-4 py-2 text-xs font-bold transition-colors focus:outline-none">
              <option>Liberia (LR)</option>
              <option>Global (INT)</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
