'use client';

import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { css, cx } from 'antd-style';
import { CSSProperties, memo } from 'react';

import { FileListItem } from '@/types/files';

import NotSupport from './NotSupport';
import PDFRenderer from './Renderer/PDF';

const container = css`
  background: transparent !important;

  #proxy-renderer {
    height: 100%;
  }
  #image-renderer {
    background: transparent !important;
  }
`;

interface FileViewerProps extends FileListItem {
  className?: string;
  style?: CSSProperties;
}

const FileViewer = memo<FileViewerProps>(({ id, style, fileType, url, name }) => {
  if (fileType?.toLowerCase() === 'pdf' || name?.toLowerCase().endsWith('.pdf')) {
    return <PDFRenderer fileId={id} url={url} />;
  }

  return (
    <DocViewer
      className={cx(container)}
      config={{
        header: { disableHeader: true },
        noRenderer: { overrideComponent: NotSupport },
      }}
      documents={[{ fileName: name, fileType, uri: url }]}
      pluginRenderers={DocViewerRenderers}
      style={style}
    />
  );
});

export default FileViewer;
