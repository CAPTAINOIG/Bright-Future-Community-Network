import { Drawer as AntDrawer, ConfigProvider } from 'antd';
import { X } from 'lucide-react';
import { createContext, useContext, useMemo } from 'react';

const DrawerContext = createContext({ close: () => {} });
export const useDrawerClose = () => useContext(DrawerContext).close;

const POSITION_TO_PLACEMENT = {
  right: 'right',
  left: 'left',
  top: 'top',
  bottom: 'bottom',
};

const radiusForPlacement = (placement, radius) => {
  switch (placement) {
    case 'right':
      return `${radius} 0 0 ${radius}`;
    case 'left':
      return `0 ${radius} ${radius} 0`;
    case 'top':
      return `0 0 ${radius} ${radius}`;
    case 'bottom':
      return `${radius} ${radius} 0 0`;
    default:
      return radius;
  }
};

const HEADER_BG = '#ffffff';
const HEADER_BORDER = '#ecefec';
const BODY_BG = '#fafbf9';
const TEXT_PRIMARY = '#17231d';
const TEXT_SECONDARY = '#708078';
const ACCENT = '#1b5e20';
const RADIUS = 24;

const Drawer = (props) => {
  const {
    isOpen,
    open,
    onClose,
    position,
    placement = 'right',
    title,
    subtitle,
    description,
    children,
    footer,
    footerAlign = 'flex-end',
    width = 640,
    height = '65vh',
    size,
    maskClosable = true,
    keyboard = true,
    closeOnEscape = true,
    destroyOnClose = false,
    className = '',
    zIndex,
    onOpenChange,
    showClose = true,
    extra,
    ...rest
  } = props;

  const resolvedOpen = typeof open === 'boolean' ? open : Boolean(isOpen);
  const resolvedPlacement =
    POSITION_TO_PLACEMENT[position] || placement;
  const resolvedClose = onClose;
  const resolvedMaskClosable = maskClosable && closeOnEscape !== false;

  const resolvedWidth = useMemo(() => {
    if (size === 'sm') return 420;
    if (size === 'lg') return 880;
    if (size === 'xl') return 1100;
    return width;
  }, [size, width]);

  const resolvedHeight = useMemo(() => {
    if (size === 'sm') return '55vh';
    if (size === 'lg') return '85vh';
    if (size === 'xl') return '92vh';
    return height;
  }, [size, height]);

  const isVertical =
    resolvedPlacement === 'top' || resolvedPlacement === 'bottom';
  const radius = radiusForPlacement(resolvedPlacement, RADIUS);

  const ctxValue = useMemo(
    () => ({ close: resolvedClose || (() => {}) }),
    [resolvedClose]
  );

  return (
    <DrawerContext.Provider value={ctxValue}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: ACCENT,
            colorText: TEXT_PRIMARY,
            colorTextSecondary: TEXT_SECONDARY,
            colorBgElevated: '#ffffff',
            colorBorder: HEADER_BORDER,
            borderRadius: RADIUS,
            borderRadiusLG: RADIUS,
            borderRadiusXS: 10,
            fontFamily:
              'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          },
          components: {
            Drawer: {
              headerBg: HEADER_BG,
              bodyBg: BODY_BG,
              footerBg: '#ffffff',
              headerHeight: 76,
              headerPadding: '24px 28px',
              bodyPadding: '24px 28px 28px 28px',
              footerPadding: '16px 28px 24px 28px',
              zIndexPopup: zIndex || 1100,
              titleLineHeight: 1.2,
            },
          },
        }}
      >
        <AntDrawer
          open={resolvedOpen}
          onClose={resolvedClose}
          placement={resolvedPlacement}
          width={isVertical ? undefined : resolvedWidth}
          height={isVertical ? resolvedHeight : undefined}
          mask={true}
          maskClosable={resolvedMaskClosable}
          keyboard={keyboard && closeOnEscape !== false}
          destroyOnClose={destroyOnClose}
          closable={false}
          title={
            <div className="flex items-start justify-between gap-4 pr-10">
              <div className="flex-1 min-w-0">
                {typeof title === 'string' ? (
                  <h3
                    className="m-0 font-serif text-xl md:text-[22px] font-bold leading-tight truncate"
                    style={{ color: TEXT_PRIMARY }}
                  >
                    {title}
                  </h3>
                ) : (
                  <div className="font-serif">{title}</div>
                )}
                {(subtitle || description) && (
                  <p
                    className="m-0 mt-2 text-[13px] leading-relaxed"
                    style={{ color: TEXT_SECONDARY }}
                  >
                    {subtitle}
                    {subtitle && description ? ' ' : ''}
                    {description}
                  </p>
                )}
              </div>
              {extra ? <div className="shrink-0">{extra}</div> : null}
            </div>
          }
          closeIcon={null}
          extra={
            showClose ? (
              <button
                type="button"
                aria-label="Close drawer"
                onClick={resolvedClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-150 hover:-translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[color:var(--tw-ring-color,#1b5e20)]"
                style={{
                  backgroundColor: '#f4f6f4',
                  borderColor: '#e3e7e3',
                  color: '#44514a',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#eef2ee';
                  e.currentTarget.style.color = TEXT_PRIMARY;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f4f6f4';
                  e.currentTarget.style.color = '#44514a';
                }}
              >
                <X size={16} strokeWidth={2.2} />
              </button>
            ) : undefined
          }
          footer={
            footer ? (
              <div
                className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-3"
                style={{ justifyContent: footerAlign }}
              >
                {footer}
              </div>
            ) : undefined
          }
          rootStyle={{
            borderRadius: radius,
            overflow: 'hidden',
            boxShadow:
              resolvedPlacement === 'right'
                ? '-24px 0 60px -16px rgba(20, 40, 28, 0.28)'
                : resolvedPlacement === 'left'
                ? '24px 0 60px -16px rgba(20, 40, 28, 0.28)'
                : resolvedPlacement === 'top'
                ? '0 24px 60px -16px rgba(20, 40, 28, 0.28)'
                : '0 -24px 60px -16px rgba(20, 40, 28, 0.28)',
          }}
          style={{
            borderRadius: radius,
            overflow: 'hidden',
          }}
          styles={{
            wrapper: {
              borderRadius: radius,
              overflow: 'hidden',
            },
            contentWrapper: {
              borderRadius: radius,
              overflow: 'hidden',
            },
            content: {
              background: BODY_BG,
              borderRadius: radius,
              overflow: 'hidden',
            },
            header: {
              padding: '22px 28px 18px 28px',
              borderBottom: `1px solid ${HEADER_BORDER}`,
              background: HEADER_BG,
              display: 'flex',
              alignItems: 'flex-start',
              borderTopLeftRadius: resolvedPlacement === 'right' || resolvedPlacement === 'bottom' ? RADIUS : 0,
              borderTopRightRadius: resolvedPlacement === 'left' || resolvedPlacement === 'bottom' ? RADIUS : 0,
            },
            body: {
              padding: '24px 28px 28px 28px',
              background: BODY_BG,
              maxHeight: isVertical
                ? `calc(${resolvedHeight} - 76px - ${footer ? '88px' : '0px'})`
                : undefined,
              overflowY: 'auto',
            },
            footer: {
              padding: '16px 28px 24px 28px',
              borderTop: footer ? `1px solid ${HEADER_BORDER}` : 'none',
              background: '#ffffff',
              borderBottomLeftRadius: resolvedPlacement === 'right' || resolvedPlacement === 'top' ? RADIUS : 0,
              borderBottomRightRadius: resolvedPlacement === 'left' || resolvedPlacement === 'top' ? RADIUS : 0,
            },
            mask: {
              backgroundColor: 'rgba(17, 34, 24, 0.58)',
              backdropFilter: 'blur(2px)',
            },
          }}
          className={`custom-drawer ${className}`.trim()}
          rootClassName="custom-drawer-root"
          {...rest}
        >
          <style>
            {`
              .custom-drawer-root .ant-drawer-content-wrapper {
                border-radius: ${radius} !important;
                overflow: hidden !important;
              }
              .custom-drawer-root .ant-drawer-content {
                border-radius: ${radius} !important;
                overflow: hidden !important;
              }
            `}
          </style>
          {children}
        </AntDrawer>
      </ConfigProvider>
    </DrawerContext.Provider>
  );
};

export default Drawer;
