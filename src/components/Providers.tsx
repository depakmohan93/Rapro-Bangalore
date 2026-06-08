'use client'
import { ModalProvider } from '@/lib/modalContext'
import ConsultationModal from './ConsultationModal'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      {children}
      <ConsultationModal />
    </ModalProvider>
  )
}
