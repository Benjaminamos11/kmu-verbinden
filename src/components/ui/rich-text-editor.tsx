
import React, { useState, useCallback, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bold, Italic, List, Heading, Image } from "lucide-react";

interface RichTextEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialContent, onChange }) => {
  const [content, setContent] = useState<string>(initialContent || '');
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual');
  const [parsedContent, setParsedContent] = useState<any[]>([]);
  const initializedRef = useRef(false);

  // Initialize the editor content only once
  React.useEffect(() => {
    if (initializedRef.current) return;
    
    try {
      if (initialContent) {
        const parsed = JSON.parse(initialContent);
        setParsedContent(parsed);
        setContent(initialContent); // Keep the original string representation
      } else {
        const defaultContent = [{ type: 'paragraph', content: '' }];
        const serialized = JSON.stringify(defaultContent);
        setParsedContent(defaultContent);
        setContent(serialized);
        onChange(serialized);
      }
    } catch (e) {
      console.error('Error parsing content:', e);
      const defaultContent = [{ type: 'paragraph', content: '' }];
      const serialized = JSON.stringify(defaultContent);
      setParsedContent(defaultContent);
      setContent(serialized);
      onChange(serialized);
    }
    
    initializedRef.current = true;
  }, [initialContent, onChange]);

  // Handle content changes from the code editor
  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    try {
      // Only attempt to parse if in code mode
      if (editorMode === 'code') {
        const parsed = JSON.parse(newContent);
        setParsedContent(parsed);
      }
      onChange(newContent);
    } catch (e) {
      // If JSON is invalid in code mode, don't update parsedContent
      // but still update the raw content
      onChange(newContent);
    }
  }, [editorMode, onChange]);

  // Update block content in visual mode
  const updateBlockContent = useCallback((index: number, newText: string) => {
    setParsedContent(prevContent => {
      const updatedContent = [...prevContent];
      updatedContent[index] = { ...updatedContent[index], content: newText };
      
      // Update serialized content
      const serialized = JSON.stringify(updatedContent);
      setContent(serialized);
      onChange(serialized);
      
      return updatedContent;
    });
  }, [onChange]);

  // Add a new block in visual mode
  const addNewBlock = useCallback((type: string = 'paragraph') => {
    setParsedContent(prevContent => {
      const updatedContent = [...prevContent, { type, content: '' }];
      
      // Update serialized content
      const serialized = JSON.stringify(updatedContent);
      setContent(serialized);
      onChange(serialized);
      
      return updatedContent;
    });
  }, [onChange]);

  // Update image URL
  const updateImageUrl = useCallback((index: number, newUrl: string) => {
    setParsedContent(prevContent => {
      const updatedContent = [...prevContent];
      updatedContent[index] = { 
        ...updatedContent[index], 
        url: newUrl 
      };
      
      // Update serialized content
      const serialized = JSON.stringify(updatedContent);
      setContent(serialized);
      onChange(serialized);
      
      return updatedContent;
    });
  }, [onChange]);

  // Toggle between visual and code mode
  const toggleVisualMode = useCallback(() => {
    if (editorMode === 'code') {
      try {
        // When switching from code to visual, parse the JSON content
        const parsed = JSON.parse(content);
        setParsedContent(parsed);
      } catch (e) {
        console.error('Error parsing content when switching to visual mode:', e);
        // Keep the current parsed content if there's an error
      }
    }
    
    setEditorMode(prevMode => prevMode === 'visual' ? 'code' : 'visual');
  }, [editorMode, content]);

  return (
    <div className="border rounded-md p-4">
      <div className="flex gap-2 mb-4">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={toggleVisualMode}
        >
          {editorMode === 'visual' ? 'Code Editor' : 'Visual Editor'}
        </Button>
        
        {editorMode === 'visual' && (
          <>
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={() => addNewBlock('paragraph')}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => addNewBlock('heading')}
            >
              <Heading className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => addNewBlock('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => addNewBlock('image')}
            >
              <Image className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {editorMode === 'visual' ? (
        <div className="space-y-4">
          {parsedContent.map((block, index) => (
            <div key={index} className="mb-4">
              {block.type === 'paragraph' && (
                <Textarea
                  value={block.content || ''}
                  onChange={(e) => updateBlockContent(index, e.target.value)}
                  placeholder="Paragraph text..."
                  className="w-full"
                />
              )}
              {block.type === 'heading' && (
                <input
                  type="text"
                  value={block.content || ''}
                  onChange={(e) => updateBlockContent(index, e.target.value)}
                  placeholder="Heading text..."
                  className="w-full text-xl font-bold border p-2 rounded"
                />
              )}
              {block.type === 'image' && (
                <div className="space-y-2">
                  <Input
                    type="url"
                    value={block.url || ''}
                    onChange={(e) => updateImageUrl(index, e.target.value)}
                    placeholder="Image URL..."
                    className="w-full"
                  />
                  {block.url && (
                    <div className="relative mt-2 mb-2">
                      <img 
                        src={block.url} 
                        alt={block.content || "Content image"} 
                        className="max-w-full h-auto border rounded"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://placehold.co/600x400?text=Bild+nicht+verfügbar";
                        }}
                      />
                    </div>
                  )}
                  <Input
                    type="text"
                    value={block.content || ''}
                    onChange={(e) => updateBlockContent(index, e.target.value)}
                    placeholder="Image caption..."
                    className="w-full"
                  />
                </div>
              )}
              {block.type === 'list' && (
                <Textarea
                  value={block.content || ''}
                  onChange={(e) => updateBlockContent(index, e.target.value)}
                  placeholder="List items (one per line)..."
                  className="w-full"
                />
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => addNewBlock()}
            className="w-full"
          >
            + Add Paragraph
          </Button>
        </div>
      ) : (
        <Textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Enter JSON content..."
          className="w-full min-h-[300px] font-mono text-sm"
        />
      )}
    </div>
  );
};
