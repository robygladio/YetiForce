<?php
/*+***********************************************************************************************************************************
 * The contents of this file are subject to the YetiForce Public License Version 1.1 (the "License"); you may not use this file except
 * in compliance with the License.
 * Software distributed under the License is distributed on an "AS IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and limitations under the License.
 * The Original Code is YetiForce.
 * The Initial Developer of the Original Code is YetiForce. Portions created by YetiForce are Copyright (C) www.yetiforce.com. 
 * All Rights Reserved.
 *************************************************************************************************************************************/
class TaskDue{
	public $name = 'LBL_TASKS_DUE';
	public $sequence = 3;
	public $reference = 'ProjectTask';
	
	public function process( $instance ) {
		global $log;
		$log->debug("Entering TaskDue::process() method ...");
		$adb = PearDatabase::getInstance();
		$currentDate = date('Y-m-d');
		$query ='SELECT COUNT(projecttaskid) as count 
				FROM vtiger_projecttask
						INNER JOIN vtiger_crmentity ON vtiger_crmentity.crmid=vtiger_projecttask.projecttaskid
						WHERE vtiger_crmentity.deleted=0 AND vtiger_projecttask.projectid = ? AND vtiger_projecttask.projecttaskstatus IN (?,?) AND vtiger_projecttask.enddate IS NOT NULL AND vtiger_projecttask.enddate < ? ';
		$result = $adb->pquery($query, array($instance->getId(), 'Open', 'In Progress', $currentDate));
		$count = $adb->query_result($result, 0, 'count');
		$log->debug("Exiting TaskDue::process() method ...");
		return $count;
	}
}