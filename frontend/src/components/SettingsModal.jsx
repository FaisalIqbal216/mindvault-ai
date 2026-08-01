import {

X,

Moon,

Save,

Sparkles

} from "lucide-react";







function SettingsModal({

open,

onClose,

settings,

setSettings,

onSave

}){






if(!open)

return null;







const updateSetting=(key)=>{


setSettings({

...settings,

[key]:!settings[key]

});


};








return(


<div

className="modal-overlay"

onClick={onClose}

>





<div

className="settings-modal"

onClick={(e)=>e.stopPropagation()}

>







<button

className="modal-close"

onClick={onClose}

>

<X size={20}/>

</button>









<h2>

Settings

</h2>








<div className="setting-item">


<div>


<Moon size={20}/>


<div>


<h4>

Dark Mode

</h4>


<p>

Switch between dark and light theme

</p>


</div>


</div>





<label className="switch">


<input

type="checkbox"

checked={settings?.darkMode}

onChange={()=>updateSetting("darkMode")}

/>


<span></span>


</label>



</div>









<div className="setting-item">


<div>


<Save size={20}/>


<div>


<h4>

Save Chat History

</h4>


<p>

Keep your conversations saved

</p>


</div>


</div>





<label className="switch">


<input

type="checkbox"

checked={settings?.saveHistory}

onChange={()=>updateSetting("saveHistory")}

/>


<span></span>


</label>



</div>









<div className="setting-item">


<div>


<Sparkles size={20}/>


<div>


<h4>

Auto Chat Titles

</h4>


<p>

Generate titles automatically

</p>


</div>


</div>





<label className="switch">


<input

type="checkbox"

checked={settings?.autoTitle}

onChange={()=>updateSetting("autoTitle")}

/>


<span></span>


</label>



</div>










<button

className="save-settings"

onClick={onSave}

>


<Save size={17}/>

Save Changes


</button>









</div>


</div>


);


}



export default SettingsModal;