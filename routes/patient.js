var express = require('express');
var router = express.Router();
var winston = require('winston');

router.get('/', showPatientMonitoring);
router.post('/', showPatientMonitoringInfo);

function showPatientMonitoring(req, res){
  winston.info('Load patient schedule');
  res.render('patient', {
    title: 'PatientMonitoring',
    header: 'Select Patient Self-Monitoring Schedule *',
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink')
  });
};

function showPatientMonitoringInfo(req, res){
  winston.info('Saving patient info '+ scheduleType);
  var scheduleType = req.body.scheduleType;
  if(scheduleType == 'BY_TIMESLOT'){
    res.render('patientInfo', {
      scheduleTypeTime: 'By timeslot',
      timeslot: req.body['timeslot[]']
    });
  } else if (scheduleType == 'BY_FREQUENCY') {
    res.render('patientInfo', {
      scheduleTypeFreq: 'By frequency',
      times: req.body.times,
      frequency: req.body.frequency
    });
  }

  res.render('patient', {
    title: 'PatientMonitoringInfo',
    header: 'Patient Self-Monitoring Schedule',
    author: req.app.get('author'),
    authorLink: req.app.get('authorLink')
  });
};

module.exports = router;
