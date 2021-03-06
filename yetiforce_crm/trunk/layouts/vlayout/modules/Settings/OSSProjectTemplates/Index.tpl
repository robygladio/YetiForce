{*<!--
/*+***********************************************************************************************************************************
 * The contents of this file are subject to the YetiForce Public License Version 1.1 (the "License"); you may not use this file except
 * in compliance with the License.
 * Software distributed under the License is distributed on an "AS IS" basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and limitations under the License.
 * The Original Code is YetiForce.
 * The Initial Developer of the Original Code is YetiForce. Portions created by YetiForce are Copyright (C) www.yetiforce.com. 
 * All Rights Reserved.
 *************************************************************************************************************************************/
-->*}
<div class="container-fluid" id="menuEditorContainer">
    <div class="widget_header row-fluid">
        <div class="span8"><h3>{vtranslate('OSSProjectTemplates', $MODULE_NAME)}</h3></div>
    </div>
    <hr>
    <div id="my-tab-content" class="tab-content" style="margin: 0 20px;" >
        <div class='editViewContainer' id="tpl">
            <div class="row-fluid">
                <span class="span4 btn-toolbar">
                    <a class="btn addButton" data-toggle="modal" data-target="#add_project_modal">
                        <strong>{vtranslate('LBL_NEW_TPL', $MODULE_NAME)}</strong>
                    </a>
                </span>
                <span class="span4 btn-toolbar">
                    <select class="chzn-select" id="moduleFilter" >
                        <option value="">{vtranslate('LBL_ALL', $MODULE_NAME)}</option>
                        {foreach item=MODULE_MODEL key=TAB_ID from=$SUPPORTED_MODULE_MODELS}
                            <option {if $SOURCE_MODULE eq $MODULE_MODEL->getName()} selected="" {/if} value="{$MODULE_MODEL->getName()}">{vtranslate($MODULE_MODEL->getName(),$MODULE_MODEL->getName())}</option>
                        {/foreach}
                    </select>
                </span>
            </div>
            <br>
            <div class="row-fluid">
                <table class="table table-bordered table-condensed listViewEntriesTable">
                    <thead>
                        <tr class="listViewHeaders" >
                            <th width="30%">{vtranslate('LBL_TPL_NAME',$MODULE_NAME)}</th>
                            <th>{vtranslate('LBL_PROJECT_NAME',$MODULE_NAME)}</th>
                            <th colspan="2"></th>
                        </tr>
                    </thead>
                                    {if !empty($PROJECT_TPL_LIST)}

                    <tbody>
                        {foreach from=$PROJECT_TPL_LIST item=item key=key}
                        <tr class="listViewEntries" data-id="{$key}">
                                <td onclick="location.href = jQuery(this).data('url')" data-url="index.php?module=OSSProjectTemplates&parent=Settings&view=Edit&tpl_id={$key}">{$item.tpl_name}</td>
                                <td onclick="location.href = jQuery(this).data('url')" data-url="index.php?module=OSSProjectTemplates&parent=Settings&view=Edit&tpl_id={$key}">{$item.projectname}</td>
                                <td><a data-toggle="modal" data-target="#edit_project_modal" class="pull-right edit_tpl"><i title="{vtranslate('LBL_EDIT')}" class="icon-pencil alignMiddle"></i></a>
                                    <a href='index.php?module=OSSProjectTemplates&parent=Settings&action=DeleteTemplate&tpl_id={$key}&base_module=Project' class="pull-right marginRight10px">
                                        <i type="{vtranslate('REMOVE_TPL', $MODULE_NAME)}" class="icon-trash alignMiddle"></i></a>
                                </td>
                            <tr>
                        {/foreach}
                    </tbody>
                </table>
                {else}
                    <table class="emptyRecordsDiv">
                        <tbody>
                            <tr>
                                <td>
                                    {vtranslate('LBL_NO_PROJECT_TPL_ADDED',$MODULE_NAME)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                {/if}
            </div>
        </div>
    </div>
</div>
{include file='AddProjectModal.tpl'|@vtemplate_path:$SETTINGS_MODULE_NAME}
{include file='EditProjectModal.tpl'|@vtemplate_path:$SETTINGS_MODULE_NAME}

<script type="text/javascript" src="layouts/vlayout/modules/Settings/OSSProjectTemplates/resources/Edit.js"></script>