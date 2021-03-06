﻿using System;
using System.Windows;
using ININ.Alliances.CWMNAddin.model;
using ININ.Alliances.CWMNAddin.viewmodel;
using ININ.IceLib.Interactions;

namespace ININ.Alliances.CWMNAddin.view
{
    /// <summary>
    /// Interaction logic for CwmnDialog.xaml
    /// </summary>
    public partial class CwmnDialog
    {
        private CwmnSessionViewModel ViewModel { get { return DataContext as CwmnSessionViewModel; } }

        public CwmnDialog(Interaction interaction)
        {
            InitializeComponent();

            Initialize(interaction);
        }

        private void Initialize(Interaction interaction)
        {
            try
            {
                // Create new session vm
                var sessionvm = new CwmnSessionViewModel(interaction);

                // Add urls to VM
                foreach (var url in CwmnButton.Urls)
                {
                    // Make sure it doesn't think it's selected
                    url.IsSelected = false;

                    // Add to list
                    sessionvm.Urls.Add(url);
                }

                // Set to data context
                DataContext = sessionvm;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                CwmnAddin.AddinTracer.Exception(ex);
            }
        }

        private void OnSessionTypeSelected(CwmnSessionType sessiontype)
        {
            try
            {
                ViewModel.SimpleSessionType = sessiontype == CwmnSessionType.Host;
                HostOrGuestPanel.Visibility = Visibility.Collapsed;
                SessionViewPanel.Visibility = Visibility.Visible;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                CwmnAddin.AddinTracer.Exception(ex);
            }
        }
    }
}
