'use strict';

angular.module('app.controllers.molecularData',[])
.controller('MolecularDataCtrl', ['$scope','referenceService', 'ancillaryDataService','molecularDataService', function($scope,referenceService,ancillaryDataService,molecularDataService) {
	$scope.molecularDataAtomizedType = molecularDataService.molecularDataAtomizedType;
	$scope.formData.molecularData = molecularDataService.molecularData;
	//Reference
	$scope.reference = referenceService;
	//Ancillary
	$scope.ancillaryData = ancillaryDataService;
	var origR = angular.copy($scope.reference);
	var origAD = angular.copy($scope.ancillaryData);
	$scope.addAncillaryData = function(ancillaryDataList,ancillaryData){
		if(ancillaryData.source !== ''){
			ancillaryDataService.addTo(ancillaryDataList,ancillaryData);
			//Reset the scope variable
			$scope.ancillaryData = origAD;
			origAD = angular.copy($scope.ancillaryData);
		}		
	};

	$scope.addReference = function(referenceList,reference){
		if(reference.type !== ''){
			referenceService.addTo(referenceList,reference);
			//Reset the scope variable
			$scope.reference = origR;
			origR = angular.copy($scope.reference);
		}	
	};

	$scope.removeReference = function(referenceList,reference){
		referenceService.deleteFrom(referenceList,reference);	
	};
	$scope.addMolecularDataAtomizedType = function(molecularDataAtomizedType, molecular) {
		if (molecular.measurementOrFact.measurementType !== '') {
			molecularDataAtomizedType.push(molecular);
			$scope.molecularDataAtomizedType = {
				measurementOrFact: {
					measurementID: '',
					measurementType: '',
					measurementValue: '',
					measurementAccuracy: '',
					measurementUnit: '',
					measurementDeterminedDate: '',
					measurementDeterminedBy: [],
					measurementMethod: '',
					measurementRemarks: '',
					relatedTo: ''
				},
				relatedTo: '',
				ancillaryData: []
			};

		}
	};
}]);