import {JSX, memo, RefCallback, useMemo} from "react";

interface IProps {
  children: JSX.Element;
  className?: string;
  myRef?: RefCallback<Element>
  gap?: number | string;
  grow?: number;
  shrink?: number;
  order?: number;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'end' | 'left' | 'right';
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'first baseline' | 'last baseline' | 'start' | 'end' | 'self-start' | 'self-end';
  alignContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'start' | 'end' | 'baseline' | 'first baseline' | 'last baseline';
}
const Flex = (props: IProps) => {
  const { children } = props;

  const style = useMemo(() => {
    return {
      display: "flex",
      gap: props.gap || 0,
      flexGrow: props.grow || 0,
      flexShrink: props.shrink || 1,
      order: props.order || 0,
      flexWrap: props.wrap || 'nowrap',
      flexDirection: props.direction || 'row',
      justifyContent: props.justify || 'flex-start',
      alignSelf: props.alignSelf || 'auto',
      alignItems: props.alignItems || 'flex-start',
      alignContent: props.alignContent || 'flex-start',
    };
  }, [])
  
  return <div ref={props.myRef} className={props.className} style={style}>{children}</div>;
};

export default memo(Flex)