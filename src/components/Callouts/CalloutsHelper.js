var _ = require('underscore');

class CalloutsHelper {
  constructor() { }
  
  findMostImprovedConference(confs) {
    
  }

  groupConferencesByName(confs) {
    return _.groupBy(confs, "name");;
  }

  diffDiversityPercentageBetweenYears(conf, index, confGroup) {
    // console.log(confGroup);
    // console.log(index);
    // console.log("|", conf, "|");
    if (index >= (confGroup.length - 1)) {
      conf.change = 0;
    } else {
      // console.log(confGroup[index + 1]);
      conf.change = conf.diversityPercentage - confGroup[index + 1].diversityPercentage;
      conf.change = Math.round(conf.change * 100) / 100;
    }
    delete conf.diversityPercentage;
    return conf;
  }

  calculateHistoricalDiversityChanges(confGroup) {
    return _.map(confGroup.reverse(), this.diffDiversityPercentageBetweenYears, this).reverse();     
  }

  sortByYear(conferences, confName) {
    return {[confName]: _.sortBy(conferences, 'year')};
  }

  sortConfGroupByYear(confGroup) {
    return _.map(confGroup, this.sortByYear, this);;     
  }

  diversityAtParityOrGreater(conf) {
    return conf.diversityPercentage >= .50;
  }

  confFromCurrentYear(conf) {
    return conf.year == (new Date()).getFullYear();
  }
  
  diversityAccumulator(accumulator, conf) { 
    return accumulator + conf.diversityPercentage; 
  }
  
  calculateAverageDiversity(confs) {
    return confs.reduce(this.diversityAccumulator, 0) / confs.length;
  }

  findConfsForCurrentYear(confs) {
    return confs.filter(this.confFromCurrentYear);
  }

  findBestPerformingConf(confs) {
    return confs.sort(this.diversitySorter)[0];
  }

  findMostRecentlyAddedConference(confs) {
    return confs.sort(this.dateAddedSorter)[0];
  }

  findConfsAtParityOrGreater(confs) {
    return confs.filter(this.diversityAtParityOrGreater);
  }

  diversitySorter(confA, confB) {
    if (confA.diversityPercentage < confB.diversityPercentage) {
      return 1;
    }
    if (confA.diversityPercentage > confB.diversityPercentage) {
      return -1;
    }
  
    return 0;
  }
  
  dateAddedSorter(confA, confB) {
    if (confA.dateAdded < confB.dateAdded) {
      return 1;
    }
    if (confA.dateAdded > confB.dateAdded) {
      return -1;
    }
  
    return 0;
  }
}

module.exports = CalloutsHelper;
