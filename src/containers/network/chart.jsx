var _ = require('underscore')
var moment = require('moment')

import React from 'react'

import {format} from 'd3-format'
import {timeFormat} from 'd3-time-format'
import {colors} from '../../styles/colors'
import {timeAxis} from '../../parser'

import {
  TimeRange,
  Charts,
  ChartContainer,
  ChartRow,
  Brush,
  YAxis,
  LabelAxis,
  ValueAxis,
  LineChart,
  AreaChart,
  BarChart,
  Legend,
  Resizable,
  Baseline,
  styler
} from 'react-timeseries-charts'

import {TimeSeries} from 'pondjs'

import structure from '../../styles/structure.css'

import {CHART_HEIGHT, BRUSH_HEIGHT} from '../../styles/constants.js';

// 15 second max zoom
const minDuration = 15 * 1000

const signalFormat = format('d');

const leftLabelAxisLabelWidth = 110

const leftAxisLabelWidth = 60

const rightAxisLabelWidth = 60

const brushLeftLabelAxisWidth = (2 * leftLabelAxisLabelWidth)

const reconnectsStyle = styler([
  {
    key: 'value',
    color: colors.fiestared
  }
])

const generalErrorsStyle = styler([
  {
    key: 'value',
    color: colors.fiestared,
    width: 1.5
  }
])

const delayedPacketErrorsStyle = styler([
  {
    key: 'value',
    color: colors.sonicblue,
    width: 1.5
  }
])

const invalidRoadTimeWarningsStyle = styler([
  {
    key: 'value',
    color: colors.lavender,
    width: 1.5
  }
])

class Chart extends React.Component {

  constructor(props) {
    super(props)

    const {reconnects, errors} = props.data;

    const tracker = null
    const brushrange = null
    const timerange = reconnects.range()
    const initialRange = reconnects.range();

    const firstTimestamp = moment(reconnects.begin()).unix() * 1000
    const lastTimestamp = moment(reconnects.end()).unix() * 1000
    const emptyTimeSeries = timeAxis(firstTimestamp, lastTimestamp)

    this.state = {
      reconnects,      
      errors,
      tracker,
      timerange,
      brushrange,
      initialRange,
      emptyTimeSeries
    }

    this.handleTrackerChanged = this.handleTrackerChanged.bind(this)
    this.handleTimeRangeChange = this.handleTimeRangeChange.bind(this)
    this.renderNetworkSignals = this.renderNetworkSignals.bind(this)    
    this.renderReconnectsBrush = this.renderReconnectsBrush.bind(this)
  }

  handleTrackerChanged(tracker) {
    this.setState({tracker})
  }

  handleTimeRangeChange(timerange) {
    if (timerange) {
      this.setState({timerange, brushrange: timerange});
    } else {
      this.setState({timerange: this.state.initialRange, brushrange: null});
    }
  }

  renderNetworkSignals() {
    const maxGeneralErrors = parseInt(signalFormat(this.state.errors.generalErrors.max()))
    const maxDelayed = parseInt(signalFormat(this.state.errors.delayedPackets.max()))
    const maxInvalidRoadTimeWarnings = parseInt(signalFormat(this.state.errors.invalidRoadTimeWarnings.max()))
    const maxMaxErrors = _.max([maxGeneralErrors, maxDelayed, maxInvalidRoadTimeWarnings])

    const legendCategories = [
      {
        key: 'errors',
        label: 'Errors',
        disabled: false
      }, {
        key: 'delays',
        label: 'Delays',
        disabled: false
      }, {
        key: 'invalidRoadTimeWarnings',
        label: 'Invalid Road Time Warnings',
        disabled: false
      }
    ]

    const legendStyle = styler([
      {
        key: 'errors',
        color: colors.fiestared
      }, {
        key: 'delays',
        color: colors.sonicblue
      }, {
        key: 'invalidRoadTimeWarnings',
        color: colors.lavender
      }
    ])

    return (
      <div key="networkSignals">
        <div className="row">
          <div className="col-xs-12 col-sm-offset-1 col-sm-6">
            <div className={structure.alignLeft}>
              <h4 className={structure.heading}>Network errors</h4>
              <h5 className={structure.infoHeading}>Lower is better. A bump at the start is normal.</h5>
            </div>
          </div>
          <div className="col-xs-12 col-sm-4">
            <div className="pull-right">
              <div className={structure.legendWrapper}>
                <Legend type="swatch" style={legendStyle} categories={legendCategories}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Resizable>
              <ChartContainer
                timeRange={this.state.timerange}
                onTimeRangeChanged={this.handleTimeRangeChange}
                padding={0}
                enablePanZoom={true}
                minDuration={minDuration}
                maxTime={this.state.initialRange.end()}
                minTime={this.state.initialRange.begin()}
                showGrid={false}>
                <ChartRow height={CHART_HEIGHT} debug={false}>
                  <YAxis id="errors1" label="Errors" min={0} max={maxMaxErrors} absolute={true} width={leftAxisLabelWidth} type="linear" format="d"/>
                  <Charts>
                    <LineChart axis="errors1" breakLine={true} series={this.state.errors.generalErrors} style={generalErrorsStyle} smooth={true} interpolation="curveBasis"/>
                    <LineChart axis="errors1" breakLine={true} series={this.state.errors.delayedPackets} style={delayedPacketErrorsStyle} smooth={true} interpolation="curveBasis"/>
                    <LineChart axis="errors1" breakLine={true} series={this.state.errors.invalidRoadTimeWarnings} style={invalidRoadTimeWarningsStyle} smooth={true} interpolation="curveBasis"/>
                  </Charts>
                  <YAxis id="errors1" label="Network" min={0} max={maxMaxErrors} absolute={true} width={rightAxisLabelWidth} type="linear" format="d"/>
                </ChartRow>
              </ChartContainer>
            </Resizable>
          </div>
        </div>
      </div>
    )
  }

  renderReconnectsBrush() {
    return (
      <div key="reconnectsBrush">
        <div className="row">
          <div className="col-xs-12 col-sm-offset-1 col-sm-10">
            <div className={structure.alignLeft}>
              <h4 className={structure.heading}>Network reconnects</h4>
              <h5 className={structure.infoHeading}>Fewer is better.</h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Resizable >
              <ChartContainer timeRange={this.state.initialRange} padding={0} trackerPosition={this.state.tracker}>
                <ChartRow height={BRUSH_HEIGHT} debug={false}>
                  <Brush timeRange={this.state.brushrange} allowSelectionClear={true} onTimeRangeChanged={this.handleTimeRangeChange}></Brush>
                  <YAxis id="reconnectsBrushAxis1" label="Reconnects" min={0} max={1} width={leftAxisLabelWidth} type="linear" format="d"></YAxis>
                  <Charts>
                    <BarChart axis="reconnectsBrushAxis1" series={this.state.reconnects} style={reconnectsStyle} columns={["value"]}/>
                  </Charts>
                  <YAxis id="reconnectsBrushAxis2" label="Reconnects" min={0} max={1} width={rightAxisLabelWidth} type="linear" format="d"></YAxis>
                </ChartRow>
              </ChartContainer>
            </Resizable>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const networkSignals = this.renderNetworkSignals()    
    const brush = this.renderReconnectsBrush()
    return (
       <div className={structure.boxesWrapOuter}>
        <div className={structure.boxesWrapInner}>
          <div className={structure.boxFirstLast}>
            <div className={structure.boxHeadingLast}>
              Network Quality
            </div>
            <div className={structure.chartsBoxContent}>
              {networkSignals}        
              {brush}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export {Chart}
