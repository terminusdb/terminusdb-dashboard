import React from "react";
import {buildLinkPathDefinition} from './LinkHelp'

/**
 * Link component is responsible for encapsulating link render.
 * @example
 * const onClickLink = function(source, target) {
 *      window.alert(`Clicked link between ${source} and ${target}`);
 * };
 *
 * const onRightClickLink = function(source, target) {
 *      window.alert(`Right clicked link between ${source} and ${target}`);
 * };
 *
 * const onMouseOverLink = function(source, target) {
 *      window.alert(`Mouse over in link between ${source} and ${target}`);
 * };
 *
 * const onMouseOutLink = function(source, target) {
 *      window.alert(`Mouse out link between ${source} and ${target}`);
 * };
 *
 * <Link
 *     d="M1..."
 *     source="idSourceNode"
 *     target="idTargetNode"
 *     markerId="marker-small"
 *     strokeWidth=1.5
 *     stroke="green"
 *     className="link"
 *     opacity=1
 *     mouseCursor="pointer"
 *     onClickLink={onClickLink}
 *     onRightClickLink={onRightClickLink}
 *     onMouseOverLink={onMouseOverLink}
 *     onMouseOutLink={onMouseOutLink} />
 */
export const LinkProperty = (props)=>  {
  /**
   * Handle link click event.
   * @returns {undefined}
   */
  //handleOnClickLink = () => this.props.onClickLink && this.props.onClickLink(this.props.source, this.props.target);

  /**
   * Handle link right click event.
   * @param {Object} event - native event.
   * @returns {undefined}
   */
  //handleOnRightClickLink = event =>
    //this.props.onRightClickLink && this.props.onRightClickLink(event, this.props.source, this.props.target);

  /**
   * Handle mouse over link event.
   * @returns {undefined}
   */
  //handleOnMouseOverLink = () =>
    //this.props.onMouseOverLink && this.props.onMouseOverLink(this.props.source, this.props.target);

  /**
   * Handle mouse out link event.
   * @returns {undefined}
   */
  //handleOnMouseOutLink = () =>
    //this.props.onMouseOutLink && this.props.onMouseOutLink(this.props.source, this.props.target);

  //render() {
    const lineStyle = {
      strokeWidth: 4,//this.props.strokeWidth,
      stroke: 'green',//this.props.stroke,
      opacity: 1,//this.props.opacity,
      fill: "none",
      cursor: 'pointer'//this.props.mouseCursor,
    };

    const lineProps = {
      className: 'link',//this.props.className,
      d: buildLinkPathDefinition(props.source,props.target,'CURVE_SMOOTH'),
     // onClick: this.handleOnClickLink,
      //onContextMenu: this.handleOnRightClickLink,
     // onMouseOut: this.handleOnMouseOutLink,
      //onMouseOver: this.handleOnMouseOverLink,
      style: lineStyle,
      //markerEnd:`url(#markerArrow)`
    };

    if(props.source.x<props.target.x) {
      lineProps.markerEnd = `url(#markerArrowEnd)`;
    }else{
      lineProps.markerStart = `url(#markerArrowStart)`;
    }

    const { label, id } = props;
    const textProps = {
      dy: -1,
      style: {
        fill: 'black',//this.props.fontColor,
        fontSize: '18px',//this.props.fontSize,
        fontWeight: '400'
      },
    };

    return (
      <g>
        <path  strokeDasharray="5,5"{...lineProps} id={id} />
        {label && (
          <text style={{ textAnchor: "middle" }} {...textProps}>
            <textPath href={`#${id}`} startOffset="10%">
              {label}
            </textPath>
          </text>
        )}
      </g>
    );
 // }
}