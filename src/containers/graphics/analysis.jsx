/**
 *  Copyright (c) 2016, Michael R Hanney. All rights reserved.
 *
 *  No affiliation with Zwift LLC whatsoever. Use at your own risk.
 *
 *  This source code is licensed under the MIT-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
var _ = require('underscore');
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  load,
  getPerformanceScore,
  openProfilePanel
} from '../../actions/benchmarks';
import shopping from '../../styles/shopping.css';
import Badge from '../badge';
import structure from '../../styles/structure.css';
import images from '../../styles/images.css';
import editorial from '../../styles/editorial.css';

import {
  AMAZON_US_LABEL,
  AMAZON_CA_LABEL,
  AMAZON_UK_LABEL,
  AMAZON_DE_LABEL,
  AMAZON_ES_LABEL,
  AMAZON_FR_LABEL,
  AMAZON_IT_LABEL,
  AMAZON_US_TAG,
  AMAZON_CA_TAG,
  AMAZON_UK_TAG,
  AMAZON_DE_TAG,
  AMAZON_ES_TAG,
  AMAZON_FR_TAG,
  AMAZON_IT_TAG
} from '../constants/index.js';

class Analysis extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isLoaded } = this.props;
    return isLoaded ? this.renderAnalysis() : null;
  }

  renderBuyLink(item) {
    let buyLinksMarkup;
    const buyLinks = [];
    const buyQueryTerms = item.toLowerCase().replace(' ', '+');

    buyLinks.push({
      tag: AMAZON_US_LABEL,
      href: `https://www.amazon.com/s?tag=${AMAZON_US_TAG}&keywords=${buyQueryTerms}`
    });

    buyLinks.push({
      tag: AMAZON_UK_LABEL,
      href: `https://www.amazon.co.uk/s/?tag=${AMAZON_UK_TAG}&field-keywords=${buyQueryTerms}`
    });

    buyLinks.push({
      tag: AMAZON_CA_LABEL,
      href: `https://www.amazon.ca/s/?tag=${AMAZON_CA_TAG}&field-keywords=${buyQueryTerms}`
    });

    buyLinks.push({
      tag: AMAZON_DE_LABEL,
      href: `https://www.amazon.de/s/?tag=${AMAZON_DE_TAG}&field-keywords=${buyQueryTerms}`
    });

    buyLinks.push({
      tag: AMAZON_ES_LABEL,
      href: `https://www.amazon.es/s/?tag=${AMAZON_ES_TAG}&field-keywords=${buyQueryTerms}`
    });

    buyLinks.push({
      tag: AMAZON_FR_LABEL,
      href: `https://www.amazon.fr/s/?tag=${AMAZON_FR_TAG}&field-keywords=${buyQueryTerms}`
    });

    buyLinks.push({
      tag: AMAZON_IT_LABEL,
      href: `https://www.amazon.it/s/?tag=${AMAZON_IT_TAG}&field-keywords=${buyQueryTerms}`
    });

    buyLinksMarkup = buyLinks.map(function(link, i) {
      return (
        <li key={i}>
          <a target="_blank" href={link.href}>
            {link.tag}
          </a>
        </li>
      );
    }, this);

    return buyLinksMarkup;
  }

  renderUltraGpuBuyLinks() {
    const gpusToLink = [
      'Nvidia Geforce GTX 1050 Ti',
      'Nvidia Geforce GTX 1060',
      'Nvidia Geforce GTX 1070',
      'Nvidia Geforce GTX 1080',
      'AMD Radeon RX 480'
    ];

    const buyLinks = gpusToLink.map(function(gpu, i) {
      const links = this.renderBuyLink(gpu);        
      return(
        <div className={shopping.shoplinksContainer} key={i}>          
          <span className={shopping.shoplinksEditorialLabel}>{gpu}&nbsp;</span>
          <ul className={shopping.shoplinks}>
            {links}
          </ul>
        </div>        
      );
    }, this);

    return (
      <div>
        <h3>1440 (Ultra) and 4K capable GPUs</h3>
        {buyLinks}
      </div>
    )
  }

  render1440UltraLaptopBuyLinks() {
    const gpusToLink = [
      'MSI Gaming Laptop GeForce GTX 960M',      
      'MSI VR Ready Laptop GeForce GTX 1060',
      'Asus Gaming Laptop GeForce GTX 960M',
      'Asus Gaming Laptop GeForce GTX 1050',
      'Asus Gaming Laptop GeForce GTX 1060'      
    ];

    const buyLinks = gpusToLink.map(function(gpu, i) {
      const links = this.renderBuyLink(gpu);

      return (        
          <div className={shopping.shoplinksContainer} key={i}>          
            <span className={shopping.shoplinksEditorialLabel}>{gpu}&nbsp;</span>
            <ul className={shopping.shoplinks}>
              {links}
            </ul>
          </div>        
      );
    }, this);

    return (
      <div>
      <h3>1440 (Ultra) capable laptops</h3>
        {buyLinks}
      </div>
    )
  }

  renderAnalysis() {
    const { currentSystem, devices } = this.props;

    var profileComment = '';

    if (!_.isUndefined(currentSystem.profileId)) {
      profileComment +=
        'Your graphics profile (level of realism and detail) is ' +
        this.getProfileOpinion(currentSystem.profileId) +
        ' level. The levels are Basic, Medium, High and Ultra. ';
      profileComment += 'Integrated GPUs use the Basic profile. ';
      profileComment +=
        'The Medium and High profiles use higher quality effects for increased realism. ';
      profileComment +=
        'The Ultra profile gives the highest level of realism by using more sophisticated lighting, shadows, nicer reflections on the water, and additional polygons. ';
      profileComment +=
        'Graphics profile is automatically set by the game engine according to the capabilities of your graphics processing unit (GPU). You can not set it yourself. ';
      profileComment +=
        'You do not necessarily need to be running the Ultra or 4K resolutions to get the Ultra profile. An Nvidia GTX 1050 or 960 will get the Ultra profile at High (1080) resolution. '
    }

    var performanceScore = getPerformanceScore(
      currentSystem.resolution,
      currentSystem.profileId
    );

    var mutation = performanceScore.value === 8 ? 'n' : '';

    var fpsAlertClass = this.getFpsClass(currentSystem.specs.avgFps);

    var avgFpsComment = '';
    var minFpsComment = '';
    var maxFpsComment = '';
    var additionalFpsComment = '';

    if (!_.isUndefined(currentSystem.specs.avgFps)) {
      avgFpsComment =
        'Your average frame rate is ' +
        this.getFpsOpinion(currentSystem.specs.avgFps) +
        ', ';
    }

    if (!_.isUndefined(currentSystem.specs.minFps)) {
      minFpsComment =
        'your minimum frame rate is ' +
        this.getFpsOpinion(currentSystem.specs.minFps) +
        ', ';
    }

    if (!_.isUndefined(currentSystem.specs.maxFps)) {
      maxFpsComment =
        'and your maximum frame rate is ' +
        this.getFpsOpinion(currentSystem.specs.maxFps) +
        '. ';
    }

    if (currentSystem.specs.avgFps <= 15 && currentSystem.resolution > 576) {
      additionalFpsComment =
        'Lower your resolution to 576 to increase your average frame rate. ';
    } else if (
      currentSystem.specs.avgFps <= 30 &&
      currentSystem.resolution > 750 &&
      currentSystem.resolution < 1440
    ) {
      additionalFpsComment =
        'Lower your resolution to 720 to increase your average frame rate. ';
    } else if (
      currentSystem.specs.avgFps <= 30 &&
      currentSystem.resolution > 1080 &&
      currentSystem.resolution < 1440
    ) {
      additionalFpsComment =
        'Lower your resolution to 1080 to increase your average frame rate. ';
    } else if (
      currentSystem.specs.avgFps <= 45 &&
      currentSystem.resolution > 1080
    ) {
      additionalFpsComment =
        'Lower your resolution to 1080 to increase your average frame rate. ';
    }

    var resolutionComment = '';

    let ultraGpuBuyLinks = null;

    let ultraLaptopBuyLinks = null;

    if (!_.isUndefined(currentSystem.resolution)) {
      resolutionComment += `Your resolution (picture frame size measured in the number of pixels in the vertical axis) is ${this.getResolutionOpinion(
        currentSystem.resolution
      )}. `;
      resolutionComment +=
        'The levels are 576 (standard definition - SD), 720 (high definition - HD), High (1080 - full high definition - FHD), ';
      resolutionComment +=
        'Ultra (1440 - wide quad high definition - WQHD - 4 times as many pixels as 720 HD), ';
      resolutionComment +=
        'and 4K (2160 - ultra high definition - 4 times as many pixels as 1080 FHD). ';
      resolutionComment +=
        'You can change the graphics resolution to whatever you want. However, a high end discrete GPU is necessary to unlock the Ultra and 4K resolution options.';

      ultraGpuBuyLinks = this.renderUltraGpuBuyLinks();

      ultraLaptopBuyLinks = this.render1440UltraLaptopBuyLinks();
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className={structure.boxesWrapOuter}>
              <div className={structure.boxesWrapInner}>
                <div className={structure.boxFirstLast}>
                  <div className={structure.boxHeadingLast}>
                    Graphics Analysis
                  </div>
                  <div className={editorial.editorialBoxContent}>
                    <div className="row">
                      <div className="col-xs-12 col-sm-offset-1 col-sm-10">
                        <div className={fpsAlertClass}>
                          <p>
                            {avgFpsComment}
                            {minFpsComment}
                            {maxFpsComment}
                            {additionalFpsComment}                            
                          </p>
                        </div>
                        <h3>Graphics profile</h3>
                        <p>
                          {profileComment}
                        </p>
                        <h3>Graphics resolution</h3>
                        <p>
                          {resolutionComment}
                        </p>                        
                        {ultraGpuBuyLinks}
                        {ultraLaptopBuyLinks}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getFpsOpinion(fps) {
    if (fps <= 15) {
      return 'low';
    } else if (fps <= 20) {
      return 'ok';
    } else if (fps <= 30) {
      return 'average';
    } else if (fps <= 45) {
      return 'good';
    } else if (fps < 60) {
      return 'very good';
    } else {
      return 'excellent';
    }
  }

  getFpsClass(fps) {
    if (fps <= 20) {
      return 'alert alert-danger';
    } else if (fps <= 30) {
      return 'alert alert-warning';
    } else if (fps <= 45) {
      return 'alert alert-info';
    } else {
      return 'alert alert-success';
    }
  }

  getProfileOpinion(profileId) {
    switch (profileId) {
      case 0:
        return 'Basic, which is the lowest';

      case 1:
        return 'Medium, which is one level above the lowest';

      case 2:
        return 'High, which is one level below the highest';

      case 3:
        return 'Ultra, which is the highest';

      default:
        return 'at an unknown';
    }
  }

  getResolutionOpinion(resolution) {
    switch (resolution) {
      case 576:
        return '576 standard definition (SD), which is the same as a 1980s television. This is the lowest setting';

      case 720:
        return '720 high definition (HD), which is the same as a 1990s HD television. This is one level above the lowest setting';

      case 750:
        return '750 high definition (HD) iOS (iPhone 7)';

      case 1080:
        return '1080 full high definition (FHD), which is the same as full HD television. This is the middle setting';

      case 1440:
        return '1440 wide quad high definition (WQHD), which 4 times as many pixels as 720 HD, which is one level below the highest setting';

      case 2160:
        return '2160 ultra high definition (4K), 4 times as many pixels as 1080 FHD, which is the highest setting';

      default:
        return 'at an unknown';
    }
  }
}

function mapStateToProps(state) {
  const { reader, system, graphics, benchmarks } = state;
  return {
    ...reader,
    ...system,
    ...graphics,
    ...benchmarks
  };
}

Analysis.propTypes = {
  system: PropTypes.object,
  ant: PropTypes.object
};

export default connect(mapStateToProps)(Analysis);
