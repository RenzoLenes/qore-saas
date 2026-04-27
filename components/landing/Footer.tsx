import Image from 'next/image';
import Link from 'next/link';
import { Linkedin, Mail } from 'lucide-react';
import { FOOTER_COLS } from '@/lib/landing-content';

export default function Footer() {
  return (
    <footer className="border-t-2 border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1 flex flex-col gap-4 max-w-xs">
            <Link href="/"><Image src="/logo.png" alt="QORE" width={112} height={28} className="h-7 w-auto self-start" /></Link>
            <p className="text-[13px] text-slate-500 leading-relaxed">
              Control de asistencia con QR y GPS para empresas modernas en Perú.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/company/qoreapp/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-[#0891b2] hover:border-[#2dd4ff]/30 transition-colors"
              >
                <Linkedin className="h-[15px] w-[15px]" />
              </a>
              <a
                href="mailto:contacto@senelstudio.me"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-[#0891b2] hover:border-[#2dd4ff]/30 transition-colors"
              >
                <Mail className="h-[15px] w-[15px]" />
              </a>
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-[13px] font-semibold text-slate-700">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link href={link.href} className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <h4 className="text-[13px] font-semibold text-slate-700">Contacto</h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href="mailto:contacto@senelstudio.me" className="text-[13px] font-mono text-[#0891b2] hover:underline">
                  contacto@senelstudio.me
                </a>
              </li>
              <li>
                <span className="text-[13px] text-slate-500">Lima, Perú</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Senel Studio. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacidad" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
              Términos
            </Link>
            <a href="mailto:contacto@senelstudio.me" className="text-xs font-mono text-slate-400 hover:text-slate-700 transition-colors">
              contacto@senelstudio.me
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
