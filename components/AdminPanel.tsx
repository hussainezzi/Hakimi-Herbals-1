import React, { useState } from 'react';
import { X, Upload, Copy, Check, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../constants';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleUpload = () => {
    // @ts-ignore - Cloudinary is loaded via script tag
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDINARY_CLOUD_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        cropping: true,
        styles: {
          palette: {
            window: "#FDF8F1",
            windowBorder: "#728C69",
            tabIcon: "#2C3E2D",
            menuIcons: "#2C3E2D",
            textDark: "#2C3E2D",
            textLight: "#FFFFFF",
            link: "#C05A35",
            action: "#728C69",
            inactiveTabIcon: "#728C69",
            error: "#C05A35",
            inProgress: "#728C69",
            complete: "#728C69",
            sourceBg: "#FDF8F1"
          }
        }
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          setUploadedUrl(result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  const copyToClipboard = () => {
    if (uploadedUrl) {
      navigator.clipboard.writeText(uploadedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-hakimi-forest/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up border border-hakimi-sage/10">
        <div className="bg-hakimi-forest p-8 text-hakimi-cream flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Upload className="w-6 h-6 text-hakimi-terracotta" />
              Owner Portal
            </h2>
            <p className="text-hakimi-sage text-xs font-bold uppercase tracking-widest mt-1">Archive The Harvest</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-6 bg-hakimi-cream/30">
          <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-hakimi-sage/30 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-hakimi-sage/10 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="w-10 h-10 text-hakimi-sage" />
            </div>
            <h3 className="text-xl font-bold text-hakimi-forest mb-2">Capture Raw Assets</h3>
            <p className="text-gray-500 text-sm mb-8 max-w-xs font-medium">
              Upload natural captures to the Cloudinary vault for inventory referencing.
            </p>
            <button
              onClick={handleUpload}
              className="bg-hakimi-sage hover:bg-hakimi-forest text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl flex items-center gap-3 active:scale-95 uppercase tracking-widest"
            >
              <Upload className="w-5 h-5" /> Begin Upload
            </button>
          </div>

          {uploadedUrl && (
            <div className="animate-fade-in-up space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-hakimi-sage/20 shadow-sm">
                <p className="text-[10px] font-black text-hakimi-sage uppercase tracking-widest mb-3">Asset Stored Successfully</p>
                <div className="flex gap-5 items-center">
                  <img src={uploadedUrl} alt="Preview" className="w-24 h-24 object-cover rounded-xl border-4 border-hakimi-cream shadow-sm" />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-hakimi-forest truncate mb-2">{uploadedUrl}</p>
                    <div className="flex gap-4">
                      <button 
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 text-xs font-black text-hakimi-terracotta hover:underline uppercase tracking-tighter"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'Captured!' : 'Copy Reference'}
                      </button>
                      <a 
                        href={uploadedUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-hakimi-forest uppercase tracking-tighter"
                      >
                        <ExternalLink className="w-3 h-3" /> Inspect
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-hakimi-forest px-8 py-5 flex justify-between items-center">
          <span className="text-[10px] text-hakimi-sage font-black tracking-[0.2em] uppercase">Cloudinary Powered</span>
          <button onClick={onClose} className="text-sm font-bold text-white hover:text-hakimi-terracotta transition-colors">Close Portal</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;