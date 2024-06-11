import React from 'react';
import CertificateContent from './certificatetemplates/basic01';
import Template02 from './certificatetemplates/basic02';
import Template03 from './certificatetemplates/03_sarthak';

import Template04 from './certificatetemplates/basic04';
import Template05 from './certificatetemplates/basic05';
import Template06 from './certificatetemplates/basic06';
import Template07 from './certificatetemplates/basic07';
import Template08 from './certificatetemplates/premium01';
import Template09 from './certificatetemplates/template09';


function SelectCertficate({
  templateId,
  eventId,
  contentBody,
  certiType,
  logos,
  participantDetail,
  signature,
  header,
  footer,
}) {
  const certiDesignTemp = [
    <CertificateContent
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'0'}
    />,
    <Template02
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'1'}
    />,
    <Template03
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'2'}
    />,
    <Template04
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'3'}
    />,
    <Template05
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'4'}
    />,
    <Template06
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'5'}
    />,
    <Template07
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'6'}
    />,
    <Template08
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'7'}
    />,

    <Template09
      eventId={eventId}
      contentBody={contentBody}
      certiType={certiType}
      logos={logos}
      participantDetail={participantDetail}
      signature={signature}
      header={header}
      footer={footer}
      key={'8'}
    />,

  ];

  return <div>{certiDesignTemp[templateId]}</div>;
}

export default SelectCertficate;
