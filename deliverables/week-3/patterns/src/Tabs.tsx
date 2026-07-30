import { createContext, useContext, useState, type ReactNode } from 'react'

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext)
  if (context === null) throw new Error('useTabsContext must be used within <Tabs>. ' +
                                        'Wrap Tabs.List / Tabs.Tab / Tabs.Panel in a <Tabs> element.')
  return context
}

interface TabsProps {
  defaultValue: string
  children: ReactNode
}

function TabsRoot({ defaultValue, children }: TabsProps) {
  const [value, setValue] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  )
}

interface TabsListProps {
  children: ReactNode
  className?: string
}

function TabsList({ children, className }: TabsListProps) {
  return (
    <div role="tablist" className={className}>
      {children}
    </div>
  )
}

interface TabProps {
  value: string
  children: ReactNode
  className?: string
}

function Tab({ value, children, className }: TabProps) {
  const { value: currentValue, setValue } = useTabsContext()
  const handleClick = () => setValue(value)
  const activeTab = currentValue === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={activeTab}
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  )
}

interface TabsPanelProps {
  value: string
  children: ReactNode
  className?: string
}

function TabsPanel({ value, children, className }: TabsPanelProps) {
  const { value: currentValue } = useTabsContext()
  if (currentValue === value) {
    return (
      <div role="tabpanel" className={className}>
        {children}
      </div>
    )
  }
  return null
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel: TabsPanel,
})

