import { LayoutDashboard, HelpCircle, FileText, BookOpen, ChevronDown, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar({ onCollapsedChange = () => {} }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { label: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { label: 'Questions', path: '/questions', icon: <HelpCircle size={20} /> },
    { label: 'Build Paper', path: '/builder', icon: <FileText size={20} /> },
    { label: 'Saved Papers', path: '/papers', icon: <BookOpen size={20} /> },
  ]

  useEffect(() => {
    menuItems.forEach(item => {
      if (item.children && location.pathname.startsWith(item.path)) {
        setExpandedMenu(item.path)
      }
    })
  }, [location.pathname])

  const handleCollapseToggle = (collapsed) => {
    setIsCollapsed(collapsed)
    if (onCollapsedChange) {
      onCollapsedChange(collapsed)
    }
  }

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path
  }

  const SidebarItem = ({ item }) => {
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.path}>
        <button
          className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
          onClick={() => {
            if (hasChildren) {
              setExpandedMenu(expandedMenu === item.path ? null : item.path)
            } else {
              navigate(item.path)
              setIsOpen(false)
            }
          }}
          title={item.label}
        >
          {item.icon}
          <span className={isCollapsed ? 'hidden' : ''}>{item.label}</span>
          {hasChildren && !isCollapsed && (
            <ChevronDown
              size={16}
              className={`chevron ${expandedMenu === item.path ? 'expanded' : ''}`}
            />
          )}
        </button>
        {hasChildren && expandedMenu === item.path && (
          <div className={`sidebar-submenu ${isCollapsed ? 'collapsed' : ''}`}>
            {item.children.map(child => (
              <button
                key={child.path}
                className={`sidebar-link submenu-link ${
                  isActive(child.path) ? 'active' : ''
                }`}
                onClick={() => {
                  navigate(child.path)
                  setIsOpen(false)
                  setExpandedMenu(null)
                }}
                title={child.label}
              >
                <span>{child.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2 className={isCollapsed ? 'hidden' : ''}>Exam Generator</h2>
          <button
            className="sidebar-toggle-btn"
            onClick={() => handleCollapseToggle(!isCollapsed)}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </nav>
      </aside>

      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
    </>
  )
}
