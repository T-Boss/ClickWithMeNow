﻿using System;
using System.Windows.Forms;
using ININ.InteractionClient;
using ININ.InteractionClient.AddIn;
using ININ.InteractionClient.Interactions;

namespace ININ.Alliances.CWMNAddin
{
    public class CwmnAddin : IAddIn
    {
        public void Load(IServiceProvider serviceProvider)
        {
            try
            {
                var service = ServiceLocator.Current.GetInstance<IClientInteractionButtonService>();
                if (service == null) throw new Exception("Unable to locate IClientInteractionButtonService service.");
                service.Add(new CwmnButton());
            }
            catch (Exception ex)
            {
                MessageBox.Show(
                    "Error on load: " + ex.Message + Environment.NewLine + Environment.NewLine +
                    "Please restart the Interaction Client and contact your system administrator if this issue persists.",
                    "Error loading CWMN Addin", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        public void Unload()
        {
            
        }
    }
}
