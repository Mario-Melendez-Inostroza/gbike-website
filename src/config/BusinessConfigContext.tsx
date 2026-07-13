import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { defaultBusinessConfig, whatsappUrl, type BusinessConfig } from './site'
import { loadBusinessConfig } from './loadBusinessConfig'

const BusinessConfigContext = createContext<BusinessConfig>(defaultBusinessConfig)

/**
 * Expone la configuración del negocio a toda la app.
 * Renderiza de inmediato con los defaults compilados y actualiza
 * cuando `public/business.json` termina de cargar y validarse.
 */
export function BusinessConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<BusinessConfig>(defaultBusinessConfig)

  useEffect(() => {
    let cancelled = false
    loadBusinessConfig().then((loaded) => {
      if (!cancelled) setConfig(loaded)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <BusinessConfigContext.Provider value={config}>
      {children}
    </BusinessConfigContext.Provider>
  )
}

export function useBusinessConfig() {
  const business = useContext(BusinessConfigContext)
  return {
    business,
    /** Enlace de WhatsApp del negocio con mensaje opcional prellenado. */
    whatsappUrl: (message?: string) => whatsappUrl(business.whatsapp.number, message),
  }
}
