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
      return `${radius}px 0 0 ${radius}px`;
    case 'left':
      return `0 ${radius}px ${radius}px 0`;
    case 'top':
      return `0 0 ${radius}px ${radius}px`;
    case 'bottom':
      return `${radius}px ${radius}px 0 0`;
    default:
      return `${radius}px`;
  }
};

const HEADER_BG = '#ffffff';
const HEADER_BORDER = '#e2e6e1';
const BODY_BG = '#f7f8f6';
const TEXT_PRIMARY = '#151a17';
const TEXT_SECONDARY = '#6e786f';
const TEXT_MUTED = '#515b53';
const ACCENT = '#17603f';
const RADIUS = 24;
const TITLE_FONT = "'Fraunces', 'Iowan Old Style', Georgia, serif";

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
            borderRadius: 12,
            borderRadiusLG: 16,
            borderRadiusXS: 8,
            fontFamily:
              "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
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
                    className="m-0 text-[1.35rem] md:text-[1.6rem] leading-[1.15]"
                    style={{ color: TEXT_PRIMARY, fontFamily: TITLE_FONT, fontWeight: 500, letterSpacing: '-0.02em' }}
                  >
                    {title}
                  </h3>
                ) : (
                  <div style={{ fontFamily: TITLE_FONT, fontWeight: 500, color: TEXT_PRIMARY }}>{title}</div>
                )}
                {(subtitle || description) && (
                  <p
                    className="m-0 mt-1.5 text-sm leading-relaxed"
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
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-100"
                style={{
                  backgroundColor: '#ffffff',
                  borderColor: HEADER_BORDER,
                  color: TEXT_MUTED,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#eff7f2';
                  e.currentTarget.style.borderColor = '#b9dcc8';
                  e.currentTarget.style.color = ACCENT;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = HEADER_BORDER;
                  e.currentTarget.style.color = TEXT_MUTED;
                }}
              >
                <X size={18} strokeWidth={2} />
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
                ? '-24px 0 60px -16px rgba(11, 35, 24, 0.28)'
                : resolvedPlacement === 'left'
                ? '24px 0 60px -16px rgba(11, 35, 24, 0.28)'
                : resolvedPlacement === 'top'
                ? '0 24px 60px -16px rgba(11, 35, 24, 0.28)'
                : '0 -24px 60px -16px rgba(11, 35, 24, 0.28)',
          }}
          style={{
            borderRadius: radius,
            overflow: 'hidden',
          }}
          styles={{
            wrapper: {
              maxWidth: '100vw',
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
              padding: '24px 28px 20px 28px',
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
              backgroundColor: 'rgba(11, 35, 24, 0.55)',
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
