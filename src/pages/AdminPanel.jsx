import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWedding } from '../context/WeddingContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiSave, FiEye, FiUpload, FiTrash2, FiPlus } = FiIcons;

const AdminPanel = () => {
  const { weddingData, updateWeddingData, saveDraft, publishWedding, isDraft } = useWedding();
  const [activeTab, setActiveTab] = useState('basic');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (isDraftSave = true) => {
    setIsSaving(true);
    
    setTimeout(() => {
      if (isDraftSave) {
        saveDraft();
      } else {
        publishWedding();
      }
      setIsSaving(false);
    }, 1000);
  };

  const handleInputChange = (section, field, value) => {
    updateWeddingData({
      [section]: {
        ...weddingData[section],
        [field]: value
      }
    });
  };

  const handleNestedInputChange = (section, subsection, field, value) => {
    updateWeddingData({
      [section]: {
        ...weddingData[section],
        [subsection]: {
          ...weddingData[section][subsection],
          [field]: value
        }
      }
    });
  };

  const tabs = [
    { id: 'basic', name: 'Basic Info', icon: FiSave },
    { id: 'story', name: 'Story', icon: FiEye },
    { id: 'ceremony', name: 'Ceremony', icon: FiUpload },
    { id: 'media', name: 'Media', icon: FiUpload }
  ];

  return (
    <div className="min-h-screen bg-midnight text-moonlight">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-moonlight hover:text-rose-gold transition-colors duration-300"
            >
              <SafeIcon icon={FiArrowLeft} className="w-6 h-6" />
            </Link>
            <h1 className="editorial text-3xl font-bold">Admin Panel</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {isDraft && (
              <span className="bg-dusty-burgundy text-moonlight px-3 py-1 rounded-full text-sm">
                Draft
              </span>
            )}
            <Link
              to="/preview"
              className="bg-navy text-moonlight px-4 py-2 rounded-lg hover:bg-navy/80 transition-colors duration-300 flex items-center space-x-2"
            >
              <SafeIcon icon={FiEye} className="w-4 h-4" />
              <span>Preview</span>
            </Link>
            <button
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="bg-dusty-burgundy text-moonlight px-4 py-2 rounded-lg hover:bg-dusty-burgundy/80 transition-colors duration-300 flex items-center space-x-2 disabled:opacity-50"
            >
              <SafeIcon icon={FiSave} className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Draft'}</span>
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="bg-rose-gold text-midnight px-4 py-2 rounded-lg hover:bg-rose-gold/80 transition-colors duration-300 font-semibold"
            >
              Publish
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="letter-style p-6 rounded-lg">
              <h2 className="handwritten text-rose-gold text-xl mb-4">Settings</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                      activeTab === tab.id
                        ? 'bg-rose-gold/20 text-rose-gold'
                        : 'text-moonlight/70 hover:text-moonlight hover:bg-moonlight/5'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="letter-style p-8 rounded-lg">
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <h2 className="editorial text-2xl font-bold mb-6">Basic Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block handwritten text-rose-gold text-lg mb-2">
                        Partner 1 Name
                      </label>
                      <input
                        type="text"
                        value={weddingData.coupleNames.partner1}
                        onChange={(e) => handleNestedInputChange('coupleNames', 'partner1', null, e.target.value)}
                        className="w-full glow-input p-3 rounded-lg text-moonlight"
                      />
                    </div>

                    <div>
                      <label className="block handwritten text-rose-gold text-lg mb-2">
                        Partner 2 Name
                      </label>
                      <input
                        type="text"
                        value={weddingData.coupleNames.partner2}
                        onChange={(e) => handleNestedInputChange('coupleNames', 'partner2', null, e.target.value)}
                        className="w-full glow-input p-3 rounded-lg text-moonlight"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block handwritten text-rose-gold text-lg mb-2">
                      Wedding Date
                    </label>
                    <input
                      type="date"
                      value={weddingData.weddingDate}
                      onChange={(e) => updateWeddingData({ weddingDate: e.target.value })}
                      className="w-full glow-input p-3 rounded-lg text-moonlight"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'ceremony' && (
                <div className="space-y-6">
                  <h2 className="editorial text-2xl font-bold mb-6">Ceremony Details</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block handwritten text-rose-gold text-lg mb-2">
                        Time
                      </label>
                      <input
                        type="text"
                        value={weddingData.ceremony.time}
                        onChange={(e) => handleNestedInputChange('ceremony', 'time', null, e.target.value)}
                        className="w-full glow-input p-3 rounded-lg text-moonlight"
                      />
                    </div>

                    <div>
                      <label className="block handwritten text-rose-gold text-lg mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={weddingData.ceremony.location}
                        onChange={(e) => handleNestedInputChange('ceremony', 'location', null, e.target.value)}
                        className="w-full glow-input p-3 rounded-lg text-moonlight"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block handwritten text-rose-gold text-lg mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={weddingData.ceremony.address}
                      onChange={(e) => handleNestedInputChange('ceremony', 'address', null, e.target.value)}
                      className="w-full glow-input p-3 rounded-lg text-moonlight"
                    />
                  </div>

                  <div>
                    <label className="block handwritten text-rose-gold text-lg mb-2">
                      Dress Code
                    </label>
                    <input
                      type="text"
                      value={weddingData.ceremony.dressCode}
                      onChange={(e) => handleNestedInputChange('ceremony', 'dressCode', null, e.target.value)}
                      className="w-full glow-input p-3 rounded-lg text-moonlight"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'story' && (
                <div className="space-y-6">
                  <h2 className="editorial text-2xl font-bold mb-6">Your Story</h2>
                  
                  <div>
                    <label className="block handwritten text-rose-gold text-lg mb-2">
                      Story Title
                    </label>
                    <input
                      type="text"
                      value={weddingData.story.title}
                      onChange={(e) => handleNestedInputChange('story', 'title', null, e.target.value)}
                      className="w-full glow-input p-3 rounded-lg text-moonlight"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="handwritten text-rose-gold text-lg">Story Entries</h3>
                      <button className="bg-rose-gold text-midnight px-3 py-1 rounded-lg text-sm hover:bg-rose-gold/80 transition-colors duration-300">
                        <SafeIcon icon={FiPlus} className="w-4 h-4 inline mr-1" />
                        Add Entry
                      </button>
                    </div>

                    {weddingData.story.entries.map((entry, index) => (
                      <div key={index} className="border border-rose-gold/20 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="body-text text-moonlight/70">Entry {index + 1}</span>
                          <button className="text-dusty-burgundy hover:text-rose-gold transition-colors duration-300">
                            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={entry.title}
                            onChange={(e) => {
                              const newEntries = [...weddingData.story.entries];
                              newEntries[index].title = e.target.value;
                              updateWeddingData({ story: { ...weddingData.story, entries: newEntries } });
                            }}
                            placeholder="Entry Title"
                            className="glow-input p-2 rounded text-moonlight"
                          />
                          <input
                            type="text"
                            value={entry.date}
                            onChange={(e) => {
                              const newEntries = [...weddingData.story.entries];
                              newEntries[index].date = e.target.value;
                              updateWeddingData({ story: { ...weddingData.story, entries: newEntries } });
                            }}
                            placeholder="Date"
                            className="glow-input p-2 rounded text-moonlight"
                          />
                        </div>
                        
                        <textarea
                          value={entry.content}
                          onChange={(e) => {
                            const newEntries = [...weddingData.story.entries];
                            newEntries[index].content = e.target.value;
                            updateWeddingData({ story: { ...weddingData.story, entries: newEntries } });
                          }}
                          placeholder="Story content..."
                          rows="4"
                          className="w-full glow-input p-3 rounded-lg text-moonlight resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'media' && (
                <div className="space-y-6">
                  <h2 className="editorial text-2xl font-bold mb-6">Media & Gallery</h2>
                  
                  <div>
                    <label className="block handwritten text-rose-gold text-lg mb-2">
                      Audio URL
                    </label>
                    <input
                      type="url"
                      value={weddingData.audio.url}
                      onChange={(e) => handleNestedInputChange('audio', 'url', null, e.target.value)}
                      className="w-full glow-input p-3 rounded-lg text-moonlight"
                      placeholder="https://example.com/audio.mp3"
                    />
                  </div>

                  <div>
                    <label className="block handwritten text-rose-gold text-lg mb-2">
                      Audio Title
                    </label>
                    <input
                      type="text"
                      value={weddingData.audio.title}
                      onChange={(e) => handleNestedInputChange('audio', 'title', null, e.target.value)}
                      className="w-full glow-input p-3 rounded-lg text-moonlight"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="handwritten text-rose-gold text-lg">Gallery Images</h3>
                      <button className="bg-rose-gold text-midnight px-3 py-1 rounded-lg text-sm hover:bg-rose-gold/80 transition-colors duration-300">
                        <SafeIcon icon={FiPlus} className="w-4 h-4 inline mr-1" />
                        Add Image
                      </button>
                    </div>

                    {weddingData.gallery.map((image, index) => (
                      <div key={image.id} className="border border-rose-gold/20 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="body-text text-moonlight/70">Image {index + 1}</span>
                          <button className="text-dusty-burgundy hover:text-rose-gold transition-colors duration-300">
                            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <input
                          type="url"
                          value={image.url}
                          onChange={(e) => {
                            const newGallery = [...weddingData.gallery];
                            newGallery[index].url = e.target.value;
                            updateWeddingData({ gallery: newGallery });
                          }}
                          placeholder="Image URL"
                          className="w-full glow-input p-2 rounded text-moonlight"
                        />
                        
                        <input
                          type="text"
                          value={image.caption}
                          onChange={(e) => {
                            const newGallery = [...weddingData.gallery];
                            newGallery[index].caption = e.target.value;
                            updateWeddingData({ gallery: newGallery });
                          }}
                          placeholder="Caption"
                          className="w-full glow-input p-2 rounded text-moonlight"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;