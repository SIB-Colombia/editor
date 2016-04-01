'use strict';

angular.module('app.controllers.managementAndConservation',[])
.controller('ManagementAndConservationCtrl', ['$scope','$http','ReferenceFactory', 'AncillaryDataFactory', function($scope,$http,ReferenceFactory,AncillaryDataFactory) {
	
	$scope.managementAndConservationAtomizedType = $scope.managementAndConservationAtomizedFactoryLocal.managementAndConservationAtomizedType;
	
	//Ancillary
	var ancillaryDataFactoryLocal = new AncillaryDataFactory();
	$scope.ancillaryData = ancillaryDataFactoryLocal.ancillaryData;
	
	//reference
	var referenceFactoryLocal = new ReferenceFactory();
	$scope.reference = referenceFactoryLocal.reference;
	
	//Local variables for reset objects
	var origMC = angular.copy($scope.managementAndConservationAtomizedType);
	var origR = angular.copy($scope.reference);
	var origAD = angular.copy($scope.ancillaryData);

	//list of lincese
	$scope.lincese_list = angular.copy($scope.lenguajes.licences);

	//list of proveedores de contenido
	$scope.prov_contenido = angular.copy($scope.lenguajes.provContenido);

	// This will be binded using the ps-open attribute
	$scope.checked = false; 

	//to edit
	$scope.index_management = '';
	$scope.index_ancillary = '';
	$scope.index_reference = '';

	$scope.slide = function(){
	    $scope.checked = !$scope.checked;
	};

	$scope.addManagement = function(){
		var req_1 = {
			method: 'POST',
			url: 'http://192.168.205.191:8080/fichas/'+$scope.formData._id+'/uses_management_and_conservation/',
			headers: {
			  'Content-Type': 'application/JSON'
			},
			data: { "id_user" : "01",
				"usesManagementAndConservation":$scope.formData.usesManagementAndConservation

			}
		};
		$http(req_1).then(function (response) {
			if(response.status===200){
				alert("Elemento guardado satisfactoriamente!");
			}
        });
	};

	$scope.addManagementAndConservation = function(list, managementAndConservation) {
		if (JSON.stringify(managementAndConservation) !== JSON.stringify(origMC)){
			if($scope.index_management!==''){
				list[$scope.index_management] = angular.copy(managementAndConservation);
			}else{
				$scope.managementAndConservationAtomizedFactoryLocal.add(list, managementAndConservation);
			}
			
			//Reset the scope variable
			$scope.managementAndConservationAtomizedType = origMC;
			origMC = angular.copy($scope.managementAndConservationAtomizedType);
			$scope.index_management = '';
		}
	};

	$scope.removeManagementAndConservation = function(list, managementAndConservation) {
		$scope.managementAndConservationAtomizedFactoryLocal.delete(list, managementAndConservation);
	};

	$scope.editManagementAndConservation = function(list, managementAndConservation,index) {
		$scope.index_management = index;
		$scope.managementAndConservationAtomizedType = angular.copy(managementAndConservation);
	};

	$scope.cancelManagementAndConservation = function() {
		$scope.managementAndConservationAtomizedType = angular.copy(origMC);
		$scope.index_management = '';
	};

	$scope.removeAction = function(list, action) {
		var index = list.indexOf(action);
		list.splice(index,1);
	};

	$scope.addAncillaryData = function(ancillaryDataList,ancillaryData){
		if(ancillaryData.license !== ''){
			var license = document.getElementById("ancillaryData.license");
			if(license !== undefined && license!==null){
				ancillaryData.license = license.value;
			}
			//if index is different to '' then replace the item because is an edit option
			ancillaryDataFactoryLocal.addTo(ancillaryDataList,ancillaryData,$scope.index_ancillary);

			//Add all local reference to general reference vector
			angular.forEach(ancillaryData.reference, function(reference) {
				referenceFactoryLocal.addTo($scope.formData.references,reference);
			});

			//Reset the scope variable
			$scope.ancillaryData = origAD;
			origAD = angular.copy($scope.ancillaryData);
			$scope.resetLicenseList(license,$scope.lincese_list);
			$scope.index_ancillary='';
			$('#ancillaryManagement').collapse("hide");
		}else{
			alert("La licencia debe ser seleccionada");
		}	
	};

	$scope.removeAncillaryData = function(ancillaryDataList,ancillaryData){
		ancillaryDataFactoryLocal.deleteFrom(ancillaryDataList,ancillaryData);
	};

	$scope.editAncillaryData = function(ancillaryDataList,ancillaryData,index) {
		$scope.index_ancillary = index;
		$scope.ancillaryData = angular.copy(ancillaryData);
		var checked_almost_one = false;
		angular.forEach($scope.lincese_list, function(item) {
            if(ancillaryData.license!==null){
            	if(ancillaryData.license === item.nombre){
  					item.checked = true;
  					checked_almost_one = true;
				}else{
					item.checked = false;
					if(item.nombre==='Otra' && !checked_almost_one){
					 	if(document.getElementById('ancillaryData.license') === null){
							item.checked = true;
							var input = document.createElement("input");
				            input.type = "text";
				            input.id = "ancillaryData.license";
				            input.value = ancillaryData.license;
				            document.getElementById("ManualLicenseManagement").appendChild(input);
						}else{
							var license = document.getElementById("ancillaryData.license");
							license.value = ancillaryData.license;
						}
					}
				}
            }
         });
		$('#ancillaryManagement').collapse("show");
	};

	$scope.cancelAncillaryData = function() {
		$scope.ancillaryData = angular.copy(origAD);
   		var license = document.getElementById("ancillaryData.license");
   		$scope.resetLicenseList(license,$scope.lincese_list);
		$scope.index_ancillary='';
		$('#ancillaryManagement').collapse("hide");
	};

	$scope.findAncillary = function(ancillaryData){
		angular.forEach($scope.formData.ancillaryData, function(ancillary) {
	        if(ancillaryData!==null && ancillaryData === ancillary.source){
				$scope.ancillaryData = angular.copy(ancillary);
			}
		});
	};

	$scope.addReference = function(referenceList,reference){
		if(reference.type !== ''){
			//if index is different to '' then replace the item because is an edit option
			referenceFactoryLocal.addTo(referenceList,reference,$scope.index_reference);

			//Reset the scope variable
			$scope.reference = origR;
			origR = angular.copy($scope.reference);
			$scope.checked = !$scope.checked;
			$scope.index_reference = '';
		}else{
			alert("El tipo de referencia debe ser seleccionado");
		}
	};

	$scope.removeReference = function(referenceList,reference){
		referenceFactoryLocal.deleteFrom(referenceList,reference);
	};

	$scope.editReference = function(referenceList,reference,index) {
		$scope.reference = angular.copy(reference);
		$scope.checked = !$scope.checked;
		$scope.index_reference = index;
	};

	$scope.cancelReference = function() {
		$scope.reference = angular.copy(origR);
		$scope.checked = !$scope.checked;
		$scope.index_reference = '';
	};
}]);